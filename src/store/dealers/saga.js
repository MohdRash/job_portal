import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DEALERS,
  GET_DEALER_DETAIL,
  CREATE_DEALER,
  UPDATE_DEALER,
  DELETE_DEALER,
} from "./actionTypes"
import {
  getDealersSuccess,
  getDealersFail,
  getDealerDetailSuccess,
  getDealerDetailFail,
  createDealerSuccess,
  createDealerFail,
  updateDealerSuccess,
  updateDealerFail,
  deleteDealerSuccess,
  deleteDealerFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getDealersAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/dealer/dealer/?search=${searchText && searchText}`)
  } else {
    return get(`/dealer/dealer/?page=${page ? page : 1}`)
  }
}
const getDealerDetailsAPi = ({ dealerId, page }) => {
  return get(`/dealer/dealer/${dealerId}/?page=${page ? page : 1}`)
}
const createDealerApi = ({ dealer }) => {
  return post("/dealer/dealer/", dealer)
}
const updateDealerApi = ({ dealerId, dealer }) => {
  return ApiPut(`/dealer/dealer/${dealerId}/`, dealer)
}
const deleteDealerApi = dealerId => {
  return del(`/dealer/dealer/${dealerId}/`)
}

function* fetchDealers({ payload }) {
  try {
    const response = yield call(getDealersAPi, payload)
    yield put(getDealersSuccess(response))
  } catch (error) {
    // yield put(getDealersFail(error))
  }
}

function* fetchDealerDetail({ payload }) {
  try {
    const response = yield call(getDealerDetailsAPi, payload)
    yield put(getDealerDetailSuccess(response))
  } catch (error) {
    yield put(getDealerDetailFail(error))
  }
}
function* onCreateDealer({ payload }) {
  try {
    const response = yield call(createDealerApi, payload)
    if (response?.error_message) {
      yield put(createDealerFail(response?.error_message))
    } else {
      yield put(createDealerSuccess(response))
      payload.history.push("/dealers")
    }
  } catch (error) {
    // yield put(createDealerFail(error))
  }
}

function* onUpdateDealer({ payload }) {
  try {
    const response = yield call(updateDealerApi, payload)
    yield put(updateDealerSuccess(response))
    payload.history.push("/dealers")
  } catch (error) {
    yield put(updateDealerFail(error))
  }
}

function* onDeleteDealer({ dealerId, history }) {
  try {
    const response = yield call(deleteDealerApi, dealerId)
    yield put(deleteDealerSuccess(response))
    history.push("/dealers")
  } catch (error) {
    yield put(deleteDealerFail(error))
  }
}

function* dealersSaga() {
  yield takeEvery(GET_DEALERS, fetchDealers)
  yield takeEvery(GET_DEALER_DETAIL, fetchDealerDetail)
  yield takeEvery(CREATE_DEALER, onCreateDealer)
  yield takeEvery(UPDATE_DEALER, onUpdateDealer)
  yield takeEvery(DELETE_DEALER, onDeleteDealer)
}

export default dealersSaga
