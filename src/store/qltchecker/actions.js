import {
  GET_QLTCHECKERS,
  GET_QLTCHECKERS_SUCCESS,
  GET_QLTCHECKERS_FAIL,
  GET_QLTCHECKER_DETAIL,
  GET_QLTCHECKER_DETAIL_SUCCESS,
  GET_QLTCHECKER_DETAIL_FAIL,
  CREATE_QLTCHECKER,
  CREATE_QLTCHECKER_SUCCESS,
  CREATE_QLTCHECKER_FAIL,
  UPLOAD_QLTCHECKER,
  UPLOAD_QLTCHECKER_SUCCESS,
  UPLOAD_QLTCHECKER_FAIL,
  UPDATE_QLTCHECKER,
  UPDATE_QLTCHECKER_SUCCESS,
  UPDATE_QLTCHECKER_FAIL,
  DELETE_QLTCHECKER,
  DELETE_QLTCHECKER_SUCCESS,
  DELETE_QLTCHECKER_FAIL,
} from "./actionTypes"

export const getQltcheckers = (searchText, page) => ({
  type: GET_QLTCHECKERS,
  payload: { searchText, page },
})

export const getQltcheckersSuccess = qltcheckers => ({
  type: GET_QLTCHECKERS_SUCCESS,
  payload: qltcheckers,
})
export const getQltcheckersFail = error => ({
  type: GET_QLTCHECKERS_FAIL,
  payload: error,
})

export const getQltcheckerDetail = qltcheckerId => ({
  type: GET_QLTCHECKER_DETAIL,
  qltcheckerId,
})

export const getQltcheckerDetailSuccess = qltcheckerDetail => ({
  type: GET_QLTCHECKER_DETAIL_SUCCESS,
  payload: qltcheckerDetail,
})

export const getQltcheckerDetailFail = error => ({
  type: GET_QLTCHECKER_DETAIL_FAIL,
  payload: error,
})

export const createQltchecker = (qltchecker, history) => ({
  type: CREATE_QLTCHECKER,
  payload: { qltchecker, history },
})

export const createQltcheckerSuccess = qltchecker => ({
  type: CREATE_QLTCHECKER_SUCCESS,
  payload: qltchecker,
})

export const createQltcheckerFail = error => ({
  type: CREATE_QLTCHECKER_FAIL,
  payload: error,
})

export const uploadQltchecker = (qltchecker, history) => ({
  type: UPLOAD_QLTCHECKER,
  payload: { qltchecker, history },
})

export const uploadQltcheckerSuccess = (qltchecker, qltcheckerId) => ({
  type: UPLOAD_QLTCHECKER_SUCCESS,
  payload: { qltchecker, qltcheckerId },
})

export const uploadQltcheckerFail = error => ({
  type: UPLOAD_QLTCHECKER_FAIL,
  payload: error,
})

export const updateQltchecker = (qltchecker, qltcheckerId) => ({
  type: UPDATE_QLTCHECKER,
  payload: { qltchecker, qltcheckerId },
})

export const updateQltcheckerSuccess = qltchecker => ({
  type: UPDATE_QLTCHECKER_SUCCESS,
  payload: qltchecker,
})

export const updateQltcheckerFail = error => ({
  type: UPDATE_QLTCHECKER_FAIL,
  payload: error,
})

export const deleteQltchecker = (qltcheckerId, history) => ({
  type: DELETE_QLTCHECKER,
  payload: { qltcheckerId, history },
})

export const deleteQltcheckerSuccess = qltchecker => ({
  type: DELETE_QLTCHECKER_SUCCESS,
  payload: qltchecker,
})

export const deleteQltcheckerFail = error => ({
  type: DELETE_QLTCHECKER_FAIL,
  payload: error,
})
