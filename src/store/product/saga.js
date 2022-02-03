import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PRODUCTS,
  GET_APPLICATION,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  // other cost
  CREATE_OTHERCOST,
  DELETE_OTHERCOST,
  //rawmaterils
  GET_RAWMATERIALS,
  CREATE_RAWMATERIAL,
  DELETE_RAWMATERIAL,
  //finished product
  GET_FINISHEDPRODUCT,
  CREATE_FINISHEDPRODUCT,
  FINISHEDDETAILS,
  GET_APPLICATION_DETAIL,
} from "./actionTypes"
import {
  getProductsSuccess,
  getProductsFail,
  getApplicationSuccess,
  getApplicationFail,
  getProductDetailSuccess,
  getProductDetailFail,
  createProductSuccess,
  createProductFail,
  updateProductSuccess,
  updateProductFail,
  deleteProductSuccess,
  deleteProductFail,
  // other cost
  createOtherCostSuccess,
  createOtherCostFail,
  deleteOtherCostSuccess,
  deleteOtherCostFail,
  //rawmaterils
  getRawmaterialsSuccess,
  getRawmaterialsFail,
  createRawmaterialSuccess,
  createRawmaterialFail,
  deleteRawmaterialSuccess,
  deleteRawmaterialFail,
  getFinishedProductSuccess,
  getFinishedProductFail,
  createFinishedProductFail,
  createFinishedProductSuccess,
  finishedDetailsSuccess,
  finishedDetailsFail,
  getApplicationDetailSuccess,
  getApplicationDetailFail,
  //finished prodcut
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

//products
function getProductsAPi({ searchText, page }) {
  if (searchText) {
    return get(`/student/student-application/`)
  } else {
    return get(`/student/student-application/`)
  }
}

function getApplicationAPi({ searchText, page }) {
  if (searchText) {
    return get(`/student/job-application/`,{ searchText, page })
  } else {
    return get(`/student/job-application/`,{ searchText, page })
  }
}
const getApplicationDetailAPi =({ applicationId }) => {
  return get(`/student/student-application/${applicationId}/`)
}
const getProductDetailsAPi =({ productId }) => {
  return get(`/student/student-application/${productId}/`)
}
const createProductApi = ({product,FormData}) => {
  console.log(product,FormData);
  // return post("/student/student-application/", {product,cv:FormData.cv, profilepic: FormData.profilepic})
}
// const updateProductApi = ({ productId, product }) => {
//   return ApiPut(`/store/product/${productId}/`, product)
// }
const deleteProductApi = ({ productId }) => {
  return del(`/store/product/${productId}/`)
}

// other cost
const createOtherCostApi = otherCost => {
  return post("store/othercost/", otherCost)
}

const deleteOtherCostApi = otherCostId => {
  return del(`store/othercost/${otherCostId}/`)
}

//rawmateril
function getRawmaterialsAPi() {
  return get("/store/rawmaterial/")
}
const createRawmaterialApi = rawmaterial => {
  return post("/store/rawmaterial/", rawmaterial)
}

const deleteRawmaterialApi = rawmaterialId => {
  return del(`/store/rawmaterial/${rawmaterialId}/`)
}

//finished product
function getFinishedProductAPi({ searchText, page }) {
  if (searchText) {
    return get(
      `/supervisor/finishedproducts/?search=${searchText && searchText}`
    )
  } else {
    return get(`/supervisor/finishedproducts/?page=${page ? page : 1}`)
  }
}
const createFinishedProductApi = fproduct => {
  return post("/supervisor/finishedproducts/", fproduct)
}

const getFinishedProductDeatilAPi = id => {
  return post("/supervisor/finished-product-id/", { id: id })
}
//finishedDEatails
function* fetchFinishedProductDeatil({ payload }) {
  try {
    const response = yield call(getFinishedProductDeatilAPi, payload)
    yield put(finishedDetailsSuccess(response))
  } catch (error) {
    yield put(finishedDetailsFail(error))
  }
}

//products
function* fetchProducts({ payload }) {
  try {
    const response = yield call(getProductsAPi, payload)
    yield put(getProductsSuccess(response))
  } catch (error) {
    yield put(getProductsFail(error))
  }
}

function* fetchApplication({ payload }) {
  try {
    const response = yield call(getApplicationAPi, payload)
    yield put(getApplicationSuccess(response))
  } catch (error) {
    yield put(getApplicationFail(error))
  }
}

function* fetchApplicationDetail({ applicationId }) {
  try {
    const response = yield call(getApplicationDetailAPi, applicationId)
    yield put(getApplicationDetailSuccess(response))
  } catch (error) {
    yield put(getApplicationDetailFail(error))
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetailsAPi, productId)
    yield put(getProductDetailSuccess(response))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}
function* onCreateProduct({ payload }) {
  console.log(payload);
  try {
    const response = yield call(createProductApi, payload)
    if (response?.error_message) {
      yield put(createProductFail(response?.error_message))
    } else {
      yield put(createProductSuccess(response))
      yield put(getProductDetailSuccess(response))
    }
  } catch (error) {
    // yield put(createProductFail(error))
  }
}

// function* onUpdateProduct({ payload }) {
//   try {
//     const response = yield call(updateProductApi, payload)
//     yield put(updateProductSuccess(response))
//   } catch (error) {
//     yield put(updateProductFail(error))
//   }
// }

function* onDeleteProduct({ payload }) {
  try {
    const response = yield call(deleteProductApi, payload)
    yield put(deleteProductSuccess(response))
    payload.history.push("/products")
  } catch (error) {
    yield put(deleteProductFail(error))
  }
}

// other cost
function* onCreateOtherCost({ payload: otherCost }) {
  try {
    const response = yield call(createOtherCostApi, otherCost)
    if (response?.error_message) {
      yield put(createOtherCostFail(response?.error_message))
    } else {
      yield put(createOtherCostSuccess(response))
    }
  } catch (error) {
    yield put(createOtherCostFail(error))
  }
}

function* onDeleteOtherCost({ payload }) {
  try {
    const response = yield call(deleteOtherCostApi, payload)
    yield put(deleteOtherCostSuccess({ ...response, id: payload }))
  } catch (error) {
    yield put(deleteOtherCostFail(error))
  }
}

//rawmateril
function* fetchRawmaterials() {
  try {
    const response = yield call(getRawmaterialsAPi)
    yield put(getRawmaterialsSuccess(response))
  } catch (error) {
    yield put(getRawmaterialsFail(error))
  }
}

function* onCreateRawmaterial({ payload: rawmaterial }) {
  try {
    const response = yield call(createRawmaterialApi, rawmaterial)
    if (response?.error_message) {
      yield put(createRawmaterialFail(response?.error_message))
    } else {
      yield put(createRawmaterialSuccess(response))
    }
  } catch (error) {
    yield put(createRawmaterialFail(error))
  }
}

function* onDeleteRawmaterial({ rawmaterialId }) {
  try {
    const response = yield call(deleteRawmaterialApi, rawmaterialId)
    yield put(deleteRawmaterialSuccess({ ...response, id: rawmaterialId }))
  } catch (error) {
    yield put(deleteRawmaterialFail(error))
  }
}

//finished product
function* fetchFinishedProduct({ payload }) {
  try {
    const response = yield call(getFinishedProductAPi, payload)
    yield put(getFinishedProductSuccess(response))
  } catch (error) {
    yield put(getFinishedProductFail(error))
  }
}
function* onCreateFinishedProduct({ payload: product }) {
  try {
    const response = yield call(createFinishedProductApi, product)
    if (response?.error_message) {
      yield put(createFinishedProductFail(response?.error_message))
    } else {
      yield put(createFinishedProductFail(""))
      yield put(createFinishedProductSuccess(response))
    }
  } catch (error) {
    yield put(createProductFail(error))
  }
}

function* productsSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(GET_APPLICATION, fetchApplication)
  yield takeEvery(GET_APPLICATION_DETAIL, fetchApplicationDetail)
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail)
  yield takeEvery(CREATE_PRODUCT, onCreateProduct)
  // yield takeEvery(UPDATE_PRODUCT, onUpdateProduct)
  yield takeEvery(DELETE_PRODUCT, onDeleteProduct)
  // other cost
  yield takeEvery(CREATE_OTHERCOST, onCreateOtherCost)
  yield takeEvery(DELETE_OTHERCOST, onDeleteOtherCost)
  //rawmateril
  yield takeEvery(GET_RAWMATERIALS, fetchRawmaterials)
  yield takeEvery(CREATE_RAWMATERIAL, onCreateRawmaterial)
  yield takeEvery(DELETE_RAWMATERIAL, onDeleteRawmaterial)
  //finshed product
  yield takeEvery(GET_FINISHEDPRODUCT, fetchFinishedProduct)
  yield takeEvery(CREATE_FINISHEDPRODUCT, onCreateFinishedProduct)
  yield takeEvery(FINISHEDDETAILS, fetchFinishedProductDeatil)
}

export default productsSaga
