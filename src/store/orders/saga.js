import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  UPDATE_ORDER,
  CREATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER_ITEM,
} from "./actionTypes"
import {
  getOrdersSuccess,
  getOrdersFail,
  getOrderDetailSuccess,
  getOrderDetailFail,
  createOrderSuccess,
  createOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { updateOrderItemFail, updateOrderItemSuccess } from "store/actions"

function getOrdersAPi({ searchText, page }) {
  if (searchText) {
    return get(`/order/order/?search=${searchText && searchText}`)
  } else {
    return get(`/order/order/?page=${page ? page : 1}`)
  }
}
const getOrderDetailsAPi = orderId => {
  return get(`/order/order/${orderId}/`)
}
const createOrderApi = ({ order }) => {
  return post("/order/order/", order)
}
const updateOrderApi = ({ orderId, order, statusUpdate }) => {
  if (statusUpdate) {
    return patch(`/order/order/${orderId}/`, statusUpdate)
  } else {
    return ApiPut(`/order/order/${orderId}/`, order)
  }
}
const updateOrderItemApi = ({ order, orderItemId }) => {
  return ApiPut(`order/orderitem/${orderItemId}/`, order)
}
const deleteOrderApi = orderId => {
  return del(`/order/order/${orderId}/`)
}

function* fetchOrders({ payload }) {
  try {
    const response = yield call(getOrdersAPi, payload)
    yield put(getOrdersSuccess(response))
  } catch (error) {
    yield put(getOrdersFail(error))
  }
}

function* fetchOrderDetail({ orderId }) {
  try {
    const response = yield call(getOrderDetailsAPi, orderId)
    yield put(getOrderDetailSuccess(response))
  } catch (error) {
    yield put(getOrderDetailFail(error))
  }
}
function* onCreateOrder({ payload }) {
  try {
    const response = yield call(createOrderApi, payload)
    if (response?.error_message) {
      yield put(createOrderFail(response?.error_message))
    } else {
      yield put(createOrderSuccess(response))
      payload.history.push("/orders")
    }
  } catch (error) {
    yield put(createOrderFail(error))
  }
}

function* onUpdateOrder({ payload }) {
  try {
    const response = yield call(updateOrderApi, payload)
    if (response.response == "No Stocks Available") {
      yield put(updateOrderFail(response))
    } else {
      yield put(updateOrderSuccess(response))
    }
  } catch (error) {
    yield put(updateOrderFail(error))
  }
}

function* onUpdateOrderItem({ payload }) {
  try {
    const response = yield call(updateOrderItemApi, payload)
    yield put(updateOrderItemSuccess({ ...response, id: payload.orderItemId }))
  } catch (error) {
    yield put(updateOrderItemFail(error))
  }
}

function* onDeleteOrder({ orderId, history }) {
  try {
    const response = yield call(deleteOrderApi, orderId)
    yield put(deleteOrderSuccess(response))
    history.push("/orders")
  } catch (error) {
    yield put(deleteOrderFail(error))
  }
}

function* ordersSaga() {
  yield takeEvery(GET_ORDERS, fetchOrders)
  yield takeEvery(GET_ORDER_DETAIL, fetchOrderDetail)
  yield takeEvery(CREATE_ORDER, onCreateOrder)
  yield takeEvery(UPDATE_ORDER, onUpdateOrder)
  yield takeEvery(DELETE_ORDER, onDeleteOrder)
  yield takeEvery(UPDATE_ORDER_ITEM, onUpdateOrderItem)
}

export default ordersSaga
