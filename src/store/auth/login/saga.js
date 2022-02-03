import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, FORGET_PASSWORD, RECOVERY_OTP } from "./actionTypes"
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  userForgetPasswordSuccess,
  userForgetPasswordError,
} from "./actions"
import { post } from "helpers/api_methods"

function loginApi(user) {
  return post("/account/login/", user)
}
function logoutApi(token) {
  return post("/account/logout", token)
}
function forgetUserPassApi(email) {
  return post("/account/forget-password-email/", email)
}

function recoveryOtpApi(otp) {
  return post("account/forget-password-verify/", otp)
}

function* forgetUserPass({ payload }) {
  try {
    const response = yield call(forgetUserPassApi, payload)
    if (response) {
      yield put(userForgetPasswordSuccess(response?.response))
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

function* recoveryOtp({ payload: otp }) {
  try {
    const response = yield call(recoveryOtpApi, otp)
    
    if (response) {
      yield put(recoveryOtpSuccess(response))
      history.push("/login")
    }
  } catch (error) {
    yield put(error)
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(loginApi, user)
    if (response?.token) {
      sessionStorage.setItem("token", response.token)
      sessionStorage.setItem("user", response.username)
      sessionStorage.setItem("role", response.role)
    }
    if (response?.error_message) {
      yield put(apiError(response?.error_message))
    } else {
      yield put(loginSuccess(response))
      history.push("/dashboard")
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    const token = sessionStorage.getItem("token")
    const response = yield call(logoutApi, token)
    sessionStorage.clear("token")
    if (response?.error_message) {
      yield put(apiError(response?.error_message))
    } else {
      yield put(logoutUserSuccess(response))
      history.push("/login")
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(FORGET_PASSWORD, forgetUserPass)
  yield takeEvery(RECOVERY_OTP, recoveryOtp)
}

export default authSaga
