import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_STOREMNGRS,
  GET_STOREMNGR_DETAIL,
  CREATE_STOREMNGR,
  UPDATE_STOREMNGR,
  DELETE_STOREMNGR,
} from "./actionTypes"
import {
  getStoremngrsSuccess,
  getStoremngrsFail,
  getStoremngrDetailSuccess,
  getStoremngrDetailFail,
  createStoremngrSuccess,
  createStoremngrFail,
  updateStoremngrSuccess,
  updateStoremngrFail,
  deleteStoremngrSuccess,
  deleteStoremngrFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getStoremngrsAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/storemanager/?search=${searchText && searchText}`)
  } else {
    return get(`/account/storemanager/?page=${page ? page : 1}`)
  }
}
const getStoremngrDetailsAPi = storemngrId => {
  return get(`/account/storemanager/${storemngrId}/`)
}
const createStoremngrApi = ({ storemngr }) => {
  return post("/account/storemanager/", storemngr)
}
const updateStoremngrApi = ({ storemngrId, storemngr }) => {
  return ApiPut(`/account/storemanager/${storemngrId}/`, storemngr)
}
const deleteStoremngrApi = ({ storemngrId }) => {
  return del(`/account/storemanager/${storemngrId}/`)
}

function* fetchStoremngrs({ payload }) {
  try {
    const response = yield call(getStoremngrsAPi, payload)
    yield put(getStoremngrsSuccess(response))
  } catch (error) {
    // yield put(getStoremngrsFail(error))
  }
}

function* fetchStoremngrDetail({ storemngrId }) {
  try {
    const response = yield call(getStoremngrDetailsAPi, storemngrId)
    yield put(getStoremngrDetailSuccess(response))
  } catch (error) {
    yield put(getStoremngrDetailFail(error))
  }
}
function* onCreateStoremngr({ payload }) {
  try {
    const response = yield call(createStoremngrApi, payload)
    if (response?.error_message) {
      yield put(createStoremngrFail(response?.error_message))
    } else {
      yield put(createStoremngrSuccess(response))
      payload.history.push("/storemanagers")
    }
  } catch (error) {
    // yield put(createStoremngrFail(error))
  }
}

function* onUpdateStoremngr({ payload }) {
  try {
    const response = yield call(updateStoremngrApi, payload)
    yield put(updateStoremngrSuccess(response))
    // payload.history.push('/')
  } catch (error) {
    yield put(updateStoremngrFail(error))
  }
}

function* onDeleteStoremngr({ payload }) {
  try {
    const response = yield call(deleteStoremngrApi, payload)
    yield put(deleteStoremngrSuccess(response))
    payload.history.push("/storemanagers")
  } catch (error) {
    yield put(deleteStoremngrFail(error))
  }
}

function* storemngrsSaga() {
  yield takeEvery(GET_STOREMNGRS, fetchStoremngrs)
  yield takeEvery(GET_STOREMNGR_DETAIL, fetchStoremngrDetail)
  yield takeEvery(CREATE_STOREMNGR, onCreateStoremngr)
  yield takeEvery(UPDATE_STOREMNGR, onUpdateStoremngr)
  yield takeEvery(DELETE_STOREMNGR, onDeleteStoremngr)
}

export default storemngrsSaga
