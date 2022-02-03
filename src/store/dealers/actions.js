import {
  GET_DEALERS,
  GET_DEALERS_SUCCESS,
  GET_DEALERS_FAIL,
  GET_DEALER_DETAIL,
  GET_DEALER_DETAIL_SUCCESS,
  GET_DEALER_DETAIL_FAIL,
  CREATE_DEALER,
  CREATE_DEALER_SUCCESS,
  CREATE_DEALER_FAIL,
  UPDATE_DEALER,
  UPDATE_DEALER_SUCCESS,
  UPDATE_DEALER_FAIL,
  DELETE_DEALER,
  DELETE_DEALER_SUCCESS,
  DELETE_DEALER_FAIL,
} from "./actionTypes"

export const getDealers = (searchText, page) => ({
  type: GET_DEALERS,
  payload: { searchText, page },
})

export const getDealersSuccess = dealers => ({
  type: GET_DEALERS_SUCCESS,
  payload: dealers,
})
export const getDealersFail = error => ({
  type: GET_DEALERS_FAIL,
  payload: error,
})

export const getDealerDetail = (dealerId, page) => ({
  type: GET_DEALER_DETAIL,
  payload: { dealerId, page },
})

export const getDealerDetailSuccess = dealerDetail => ({
  type: GET_DEALER_DETAIL_SUCCESS,
  payload: dealerDetail,
})

export const getDealerDetailFail = error => ({
  type: GET_DEALER_DETAIL_FAIL,
  payload: error,
})

export const createDealer = (dealer, history) => ({
  type: CREATE_DEALER,
  payload: { dealer, history },
})

export const createDealerSuccess = dealer => ({
  type: CREATE_DEALER_SUCCESS,
  payload: dealer,
})

export const createDealerFail = error => ({
  type: CREATE_DEALER_FAIL,
  payload: error,
})

export const updateDealer = (dealer, dealerId, history) => ({
  type: UPDATE_DEALER,
  payload: { dealer, dealerId, history },
})

export const updateDealerSuccess = dealer => ({
  type: UPDATE_DEALER_SUCCESS,
  payload: dealer,
})

export const updateDealerFail = error => ({
  type: UPDATE_DEALER_FAIL,
  payload: error,
})

export const deleteDealer = (dealerId, history) => ({
  type: DELETE_DEALER,
  dealerId,
  history,
})

export const deleteDealerSuccess = dealer => ({
  type: DELETE_DEALER_SUCCESS,
  payload: dealer,
})

export const deleteDealerFail = error => ({
  type: DELETE_DEALER_FAIL,
  payload: error,
})
