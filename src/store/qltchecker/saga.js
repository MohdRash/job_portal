import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_QLTCHECKERS,
  GET_QLTCHECKER_DETAIL,
  CREATE_QLTCHECKER,
  UPLOAD_QLTCHECKER,
  UPDATE_QLTCHECKER,
  DELETE_QLTCHECKER,
} from "./actionTypes"
import {
  getQltcheckersSuccess,
  getQltcheckersFail,
  getQltcheckerDetailSuccess,
  getQltcheckerDetailFail,
  createQltcheckerSuccess,
  createQltcheckerFail,
  uploadQltcheckerSuccess,
  uploadQltcheckerFail,
  updateQltcheckerSuccess,
  updateQltcheckerFail,
  deleteQltcheckerSuccess,
  deleteQltcheckerFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getQltcheckersAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/main/job-application/?search=${searchText && searchText}`)
  } else {
    return get(`/main/job-application/?page=${page ? page : 1}`)
  }
}
const getQltcheckerDetailsAPi = qltcheckerId => {
  return get(`/main/job-application/${qltcheckerId}/`)
}
const createQltcheckerApi = ({ qltchecker }) => {
  return post("/main/job-application/", qltchecker)
}

const uploadQltcheckerApi = ({ qltcheckerId, qltchecker }) => {
  return patch(`/student/student-application/${qltcheckerId}/`, qltchecker)
}

const updateQltcheckerApi = ({ qltcheckerId, qltchecker }) => {
  return ApiPut(`/main/job-application/${qltcheckerId}/`, qltchecker)
}
const deleteQltcheckerApi = ({ qltcheckerId }) => {
  return del(`/main/job-application/${qltcheckerId}/`)
}

function* fetchQltcheckers({ payload }) {
  try {
    const response = yield call(getQltcheckersAPi, payload)
    yield put(getQltcheckersSuccess(response))
  } catch (error) {
    yield put(getQltcheckersFail(error))
  }
}

function* fetchQltcheckerDetail({ qltcheckerId }) {
  try {
    const response = yield call(getQltcheckerDetailsAPi, qltcheckerId)
    yield put(getQltcheckerDetailSuccess(response))
  } catch (error) {
    yield put(getQltcheckerDetailFail(error))
  }
}
function* onCreateQltchecker({ payload }) {
  try {
    const response = yield call(createQltcheckerApi, payload)
    if (response?.error_message) {
      yield put(createQltcheckerFail(response?.error_message))
    } else {
      yield put(createQltcheckerSuccess(response))
      payload.history.push("/qualitycheckers")
    }
  } catch (error) {
    yield put(createQltcheckerFail(error))
  }
}

function* onUploadQltchecker({ payload }) {
  try {
    const response = yield call(uploadQltcheckerApi, payload)
    yield put(uploadQltcheckerSuccess(response))
    payload.history.push("/qualitycheckers")
  } catch (error) {
    yield put(uploadQltcheckerFail(error))
  }
}

function* onUpdateQltchecker({ payload }) {
  try {
    const response = yield call(updateQltcheckerApi, payload)
    yield put(updateQltcheckerSuccess(response))
    payload.history.push("/qualitycheckers")
  } catch (error) {
    yield put(updateQltcheckerFail(error))
  }
}

function* onDeleteQltchecker({ payload }) {
  try {
    const response = yield call(deleteQltcheckerApi, payload)
    payload.history.push("/qualitycheckers")
    yield put(deleteQltcheckerSuccess(response))
  } catch (error) {
    yield put(deleteQltcheckerFail(error))
  }
}

function* qltcheckersSaga() {
  yield takeEvery(GET_QLTCHECKERS, fetchQltcheckers)
  yield takeEvery(GET_QLTCHECKER_DETAIL, fetchQltcheckerDetail)
  yield takeEvery(CREATE_QLTCHECKER, onCreateQltchecker)
  yield takeEvery(UPLOAD_QLTCHECKER, onUploadQltchecker)
  yield takeEvery(UPDATE_QLTCHECKER, onUpdateQltchecker)
  yield takeEvery(DELETE_QLTCHECKER, onDeleteQltchecker)
}

export default qltcheckersSaga
