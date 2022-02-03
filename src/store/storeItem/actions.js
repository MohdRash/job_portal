import {
  GET_STOREITEMS,
  GET_STOREITEMS_SUCCESS,
  GET_STOREITEMS_FAIL,
  GET_STOREITEM_DETAIL,
  GET_STOREITEM_DETAIL_SUCCESS,
  GET_STOREITEM_DETAIL_FAIL,
  CREATE_STOREITEM,
  CREATE_STOREITEM_SUCCESS,
  CREATE_STOREITEM_FAIL,
  UPDATE_STOREITEM,
  UPDATE_STOREITEM_SUCCESS,
  UPDATE_STOREITEM_FAIL,
  DELETE_STOREITEM,
  DELETE_STOREITEM_SUCCESS,
  DELETE_STOREITEM_FAIL,
  GET_STORESUPPLY,
  GET_STORESUPPLY_SUCCESS,
  GET_STORESUPPLY_FAIL,
  UPDATE_STORESUPPLY,
  UPDATE_STORESUPPLY_SUCCESS,
  UPDATE_STORESUPPLY_FAIL,
} from "./actionTypes"

export const getStoreItems = (searchText, page) => ({
  type: GET_STOREITEMS,
  payload: { searchText, page },
})

export const getStoreItemsSuccess = storeItems => ({
  type: GET_STOREITEMS_SUCCESS,
  payload: storeItems,
})
export const getStoreItemsFail = error => ({
  type: GET_STOREITEMS_FAIL,
  payload: error,
})

export const getStoreSupply = (searchText, page) => ({
  type: GET_STORESUPPLY,
  payload: { searchText, page },
})

export const getStoreSupplySuccess = storeSupply => ({
  type: GET_STORESUPPLY_SUCCESS,
  payload: storeSupply,
})
export const getStoreSupplyFail = error => ({
  type: GET_STORESUPPLY_FAIL,
  payload: error,
})

export const getStoreItemDetail = storeItemId => ({
  type: GET_STOREITEM_DETAIL,
  storeItemId,
})

export const getStoreItemDetailSuccess = storeItemDetail => ({
  type: GET_STOREITEM_DETAIL_SUCCESS,
  payload: storeItemDetail,
})

export const getStoreItemDetailFail = error => ({
  type: GET_STOREITEM_DETAIL_FAIL,
  payload: error,
})

export const createStoreItem = (storeItem, history) => ({
  type: CREATE_STOREITEM,
  payload: { storeItem, history },
})

export const createStoreItemSuccess = storeItem => ({
  type: CREATE_STOREITEM_SUCCESS,
  payload: storeItem,
})

export const createStoreItemFail = error => ({
  type: CREATE_STOREITEM_FAIL,
  payload: error,
})

export const updateStoreItem = (storeItem, storeItemId, history) => ({
  type: UPDATE_STOREITEM,
  payload: { storeItem, storeItemId, history },
})

export const updateStoreItemSuccess = storeItem => ({
  type: UPDATE_STOREITEM_SUCCESS,
  payload: storeItem,
})

export const updateStoreItemFail = error => ({
  type: UPDATE_STOREITEM_FAIL,
  payload: error,
})

export const updateStoreSupply = (storeSupply, storeSupplyId) => ({
  type: UPDATE_STORESUPPLY,
  payload: { storeSupply, storeSupplyId },
})

export const updateStoreSupplySuccess = storeSupply => ({
  type: UPDATE_STORESUPPLY_SUCCESS,
  payload: storeSupply,
})

export const updateStoreSupplyFail = error => ({
  type: UPDATE_STORESUPPLY_FAIL,
  payload: error,
})

export const deleteStoreItem = storeItemId => ({
  type: DELETE_STOREITEM,
  payload: { storeItemId },
})

export const deleteStoreItemSuccess = storeItemId => ({
  type: DELETE_STOREITEM_SUCCESS,
  payload: { storeItemId },
})

export const deleteStoreItemFail = error => ({
  type: DELETE_STOREITEM_FAIL,
  payload: error,
})
