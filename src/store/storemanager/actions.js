import {
  GET_STOREMNGRS,
  GET_STOREMNGRS_SUCCESS,
  GET_STOREMNGRS_FAIL,
  GET_STOREMNGR_DETAIL,
  GET_STOREMNGR_DETAIL_SUCCESS,
  GET_STOREMNGR_DETAIL_FAIL,
  CREATE_STOREMNGR,
  CREATE_STOREMNGR_SUCCESS,
  CREATE_STOREMNGR_FAIL,
  UPDATE_STOREMNGR,
  UPDATE_STOREMNGR_SUCCESS,
  UPDATE_STOREMNGR_FAIL,
  DELETE_STOREMNGR,
  DELETE_STOREMNGR_SUCCESS,
  DELETE_STOREMNGR_FAIL,
} from "./actionTypes"

export const getStoremngrs = (searchText, page) => ({
  type: GET_STOREMNGRS,
  payload: { searchText, page },
})

export const getStoremngrsSuccess = storemngrs => ({
  type: GET_STOREMNGRS_SUCCESS,
  payload: storemngrs,
})
export const getStoremngrsFail = error => ({
  type: GET_STOREMNGRS_FAIL,
  payload: error,
})

export const getStoremngrDetail = storemngrId => ({
  type: GET_STOREMNGR_DETAIL,
  storemngrId,
})

export const getStoremngrDetailSuccess = storemngrDetail => ({
  type: GET_STOREMNGR_DETAIL_SUCCESS,
  payload: storemngrDetail,
})

export const getStoremngrDetailFail = error => ({
  type: GET_STOREMNGR_DETAIL_FAIL,
  payload: error,
})

export const createStoremngr = (storemngr, history) => ({
  type: CREATE_STOREMNGR,
  payload: { storemngr, history },
})

export const createStoremngrSuccess = storemngr => ({
  type: CREATE_STOREMNGR_SUCCESS,
  payload: storemngr,
})

export const createStoremngrFail = error => ({
  type: CREATE_STOREMNGR_FAIL,
  payload: error,
})

export const updateStoremngr = (storemngr, storemngrId, history) => ({
  type: UPDATE_STOREMNGR,
  payload: { storemngr, storemngrId, history },
})

export const updateStoremngrSuccess = storemngr => ({
  type: UPDATE_STOREMNGR_SUCCESS,
  payload: storemngr,
})

export const updateStoremngrFail = error => ({
  type: UPDATE_STOREMNGR_FAIL,
  payload: error,
})

export const deleteStoremngr = (storemngrId, history) => ({
  type: DELETE_STOREMNGR,
  payload: { storemngrId, history },
})

export const deleteStoremngrSuccess = storemngr => ({
  type: DELETE_STOREMNGR_SUCCESS,
  payload: storemngr,
})

export const deleteStoremngrFail = error => ({
  type: DELETE_STOREMNGR_FAIL,
  payload: error,
})
