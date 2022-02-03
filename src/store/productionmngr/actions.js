import {
  GET_PRODUCTIONMNGRS,
  GET_PRODUCTIONMNGRS_SUCCESS,
  GET_PRODUCTIONMNGRS_FAIL,
  GET_PRODUCTIONMNGR_DETAIL,
  GET_PRODUCTIONMNGR_DETAIL_SUCCESS,
  GET_PRODUCTIONMNGR_DETAIL_FAIL,
  CREATE_PRODUCTIONMNGR,
  CREATE_PRODUCTIONMNGR_SUCCESS,
  CREATE_PRODUCTIONMNGR_FAIL,
  UPDATE_PRODUCTIONMNGR,
  UPDATE_PRODUCTIONMNGR_SUCCESS,
  UPDATE_PRODUCTIONMNGR_FAIL,
  DELETE_PRODUCTIONMNGR,
  DELETE_PRODUCTIONMNGR_SUCCESS,
  DELETE_PRODUCTIONMNGR_FAIL,
} from "./actionTypes"

export const getProductionmngrs = (searchText, page, paymentCode) => ({
  type: GET_PRODUCTIONMNGRS,
  payload: { searchText, page, paymentCode },
})

export const getProductionmngrsSuccess = productionmngrs => ({
  type: GET_PRODUCTIONMNGRS_SUCCESS,
  payload: productionmngrs,
})
export const getProductionmngrsFail = error => ({
  type: GET_PRODUCTIONMNGRS_FAIL,
  payload: error,
})

export const getProductionmngrDetail = productionmngrId => ({
  type: GET_PRODUCTIONMNGR_DETAIL,
  productionmngrId,
})

export const getProductionmngrDetailSuccess = productionmngrDetail => ({
  type: GET_PRODUCTIONMNGR_DETAIL_SUCCESS,
  payload: productionmngrDetail,
})

export const getProductionmngrDetailFail = error => ({
  type: GET_PRODUCTIONMNGR_DETAIL_FAIL,
  payload: error,
})

export const createProductionmngr = (v, productionmngrId, history) =>
({
  type: CREATE_PRODUCTIONMNGR,
  payload: { v, productionmngrId, history },
})

export const createProductionmngrSuccess = (productionmngr,productionmngrId,history) => ({
  type: CREATE_PRODUCTIONMNGR_SUCCESS,
  payload: { productionmngr, productionmngrId, history },
})

export const createProductionmngrFail = error => ({
  type: CREATE_PRODUCTIONMNGR_FAIL,
  payload: error,
})

export const updateProductionmngr = (
  productionmngr,
  productionmngrId,
  history
) => ({
  type: UPDATE_PRODUCTIONMNGR,
  payload: { productionmngr, productionmngrId, history },
})

export const updateProductionmngrSuccess = productionmngr => ({
  type: UPDATE_PRODUCTIONMNGR_SUCCESS,
  payload: productionmngr,
})

export const updateProductionmngrFail = error => ({
  type: UPDATE_PRODUCTIONMNGR_FAIL,
  payload: error,
})

export const deleteProductionmngr = (productionmngrId, history) => ({
  type: DELETE_PRODUCTIONMNGR,
  payload: { productionmngrId, history },
})

export const deleteProductionmngrSuccess = productionmngr => ({
  type: DELETE_PRODUCTIONMNGR_SUCCESS,
  payload: productionmngr,
})

export const deleteProductionmngrFail = error => ({
  type: DELETE_PRODUCTIONMNGR_FAIL,
  payload: error,
})
