import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PRODUCTIONMNGRS,
  GET_PRODUCTIONMNGR_DETAIL,
  CREATE_PRODUCTIONMNGR,
  UPDATE_PRODUCTIONMNGR,
  DELETE_PRODUCTIONMNGR,
} from "./actionTypes"
import {
  getProductionmngrsSuccess,
  getProductionmngrsFail,
  getProductionmngrDetailSuccess,
  getProductionmngrDetailFail,
  createProductionmngrSuccess,
  createProductionmngrFail,
  updateProductionmngrSuccess,
  updateProductionmngrFail,
  deleteProductionmngrSuccess,
  deleteProductionmngrFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getProductionmngrsAPi = ({ searchText, page, paymentCode }) => {
  if (searchText) {
    return get(
      `/main/student-view/?search=${searchText && searchText}`
    )
  } else {
    return get(`/main/student-view/?page=${page ? page : 1}&payment=${paymentCode ? paymentCode : "all"}`)
  }
}
const getProductionmngrDetailsAPi = productionmngrId => {
  return get(`/main/student-view/${productionmngrId}/`)
}
const createProductionmngrApi = ({ v, productionmngrId }) => {
  console.log(v);
  return patch(`/student/student-application/${productionmngrId}/`, v)
}
const updateProductionmngrApi = ({ productionmngrId, productionmngr }) => {
  return ApiPut(
    `/main/student-view/${productionmngrId}/`,
    productionmngr
  )
}
const deleteProductionmngrApi = ({ productionmngrId }) => {
  return del(`/main/student-view/${productionmngrId}/`)
}

function* fetchProductionmngrs({ payload }) {
  try {
    const response = yield call(getProductionmngrsAPi, payload)
    yield put(getProductionmngrsSuccess(response))
  } catch (error) {
    // yield put(getProductionmngrsFail(error))
  }
}

function* fetchProductionmngrDetail({ productionmngrId }) {
  try {
    const response = yield call(getProductionmngrDetailsAPi, productionmngrId)
    yield put(getProductionmngrDetailSuccess(response))
  } catch (error) {
    yield put(getProductionmngrDetailFail(error))
  }
}
function* onCreateProductionmngr({ payload }) {
  console.log(payload);
  try {
    const response = yield call(createProductionmngrApi, payload)
    if (response?.error_message) {
      yield put(createProductionmngrFail(response?.error_message))
    } else {
      yield put(createProductionmngrSuccess(response))
      payload.history.push("/studentsdata")
    }
  } catch (error) {
    yield put(createProductionmngrFail(error))
  }
}

function* onUpdateProductionmngr({ payload }) {
  try {
    const response = yield call(updateProductionmngrApi, payload)
    yield put(updateProductionmngrSuccess(response))
    payload.history.push("/studentsdata")
  } catch (error) {
    yield put(updateProductionmngrFail(error))
  }
}

function* onDeleteProductionmngr({ payload }) {
  try {
    const response = yield call(deleteProductionmngrApi, payload)
    yield put(deleteProductionmngrSuccess(response))
    payload.history.push("/studentsdata")
  } catch (error) {
    yield put(deleteProductionmngrFail(error))
  }
}

function* productionmngrsSaga() {
  yield takeEvery(GET_PRODUCTIONMNGRS, fetchProductionmngrs)
  yield takeEvery(GET_PRODUCTIONMNGR_DETAIL, fetchProductionmngrDetail)
  yield takeEvery(CREATE_PRODUCTIONMNGR, onCreateProductionmngr)
  yield takeEvery(UPDATE_PRODUCTIONMNGR, onUpdateProductionmngr)
  yield takeEvery(DELETE_PRODUCTIONMNGR, onDeleteProductionmngr)
}

export default productionmngrsSaga
