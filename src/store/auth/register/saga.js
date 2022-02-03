import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { REGISTER_USER, REGISTER_OTP } from "./actionTypes"
import {
  registerUserSuccess,
  registerOtpSuccess,
} from "./actions"
import { post } from "helpers/api_methods"

function registerApi(user) {
  return post("/account/register/", user)
}

function registerOtpApi(otp) {
  console.log(otp);
  return post("/account/email-verify/", otp)
}


function* registerUser({ payload: user }) {
  try {
    const response = yield call(registerApi, user)
    console.log("response //////");
    console.log('got response')
    // console.log(response.headers['set-cookie'])
    console.log(response);
    if (response) {
      // sessionStorage.setItem("token", response.token)
      sessionStorage.setItem("otp_verification", response.otp_verification)
    }
    if (response) {
      yield put(registerUserSuccess(response))
      history.push("/verify")
    }
  } catch (error) {
    yield put(error)
  }
}

function* registerOtp({ payload: otp }) {
  try {
    const response = yield call(registerOtpApi, otp)
    
    if (response) {
      yield put(registerOtpSuccess(response))
      history.push("/dashboard")
    }
  } catch (error) {
    yield put(error)
  }
}


function* authRegSaga() {
  yield takeEvery(REGISTER_USER, registerUser)
  yield takeEvery(REGISTER_OTP, registerOtp)
}

export default authRegSaga
