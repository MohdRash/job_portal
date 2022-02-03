import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_APPLICATION,
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAIL,
  GET_APPLICATION_DETAIL,
  GET_APPLICATION_DETAIL_SUCCESS,
  GET_APPLICATION_DETAIL_FAIL,

  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  //other cost
  CREATE_OTHERCOST,
  CREATE_OTHERCOST_SUCCESS,
  CREATE_OTHERCOST_FAIL,
  DELETE_OTHERCOST,
  DELETE_OTHERCOST_SUCCESS,
  DELETE_OTHERCOST_FAIL,
  //rawmaterial
  GET_RAWMATERIALS,
  GET_RAWMATERIALS_SUCCESS,
  GET_RAWMATERIALS_FAIL,
  CREATE_RAWMATERIAL,
  CREATE_RAWMATERIAL_SUCCESS,
  CREATE_RAWMATERIAL_FAIL,
  DELETE_RAWMATERIAL,
  DELETE_RAWMATERIAL_SUCCESS,
  DELETE_RAWMATERIAL_FAIL,
  // finishedproduct
  GET_FINISHEDPRODUCT,
  GET_FINISHEDPRODUCT_SUCCESS,
  GET_FINISHEDPRODUCT_FAIL,
  CREATE_FINISHEDPRODUCT,
  CREATE_FINISHEDPRODUCT_SUCCESS,
  CREATE_FINISHEDPRODUCT_FAIL,
  FINISHEDDETAILS,
  FINISHEDDETAILS_SUCCESS,
  FINISHEDDETAILS_FAIL,
} from "./actionTypes"

export const getProducts = (searchText, page) => ({
  type: GET_PRODUCTS,
  payload: { searchText, page },
})

export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
})
export const getProductsFail = error => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
})

export const getApplication = (searchText, page) => ({
  type: GET_APPLICATION,
  payload: { searchText, page },
})

export const getApplicationSuccess = applications => ({
  type: GET_APPLICATION_SUCCESS,
  payload: applications,
})
export const getApplicationFail = error => ({
  type: GET_APPLICATION_FAIL,
  payload: error,
})

export const getApplicationDetail = applicationId => ({
  type: GET_APPLICATION_DETAIL,
  applicationId,
})

export const getApplicationDetailSuccess = applicationDetail => ({
  type: GET_APPLICATION_DETAIL_SUCCESS,
  payload: applicationDetail,
})

export const getApplicationDetailFail = error => ({
  type: GET_APPLICATION_DETAIL_FAIL,
  payload: error,
})


export const getProductDetail = productId => ({
  type: GET_PRODUCT_DETAIL,
  productId,
})

export const getProductDetailSuccess = productDetail => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: productDetail,
})

export const getProductDetailFail = error => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error,
})

export const createProduct = (product,FormData) => ({
  type: CREATE_PRODUCT,
  payload: {product,FormData},
})

export const createProductSuccess = product => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
})

export const createProductFail = error => ({
  type: CREATE_PRODUCT_FAIL,
  payload: error,
})

export const updateProduct = (product, productId) => ({
  type: UPDATE_PRODUCT,
  payload: { product, productId },
})

export const updateProductSuccess = product => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
})

export const updateProductFail = error => ({
  type: UPDATE_PRODUCT_FAIL,
  payload: error,
})

export const deleteProduct = (productId, history) => ({
  type: DELETE_PRODUCT,
  payload: { productId, history },
})

export const deleteProductSuccess = product => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: product,
})

export const deleteProductFail = error => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
})

//other cost
export const createOtherCost = otherCost => ({
  type: CREATE_OTHERCOST,
  payload: otherCost,
})

export const createOtherCostSuccess = otherCost => ({
  type: CREATE_OTHERCOST_SUCCESS,
  payload: otherCost,
})

export const createOtherCostFail = error => ({
  type: CREATE_OTHERCOST_FAIL,
  payload: error,
})

export const deleteOtherCost = otherCostsId => ({
  type: DELETE_OTHERCOST,
  payload: otherCostsId,
})

export const deleteOtherCostSuccess = otherCostId => ({
  type: DELETE_OTHERCOST_SUCCESS,
  payload: otherCostId,
})

export const deleteOtherCostFail = error => ({
  type: DELETE_OTHERCOST_FAIL,
  payload: error,
})

//rawmaterials
export const getRawmaterials = () => ({
  type: GET_RAWMATERIALS,
})

export const getRawmaterialsSuccess = rawmaterials => ({
  type: GET_RAWMATERIALS_SUCCESS,
  payload: rawmaterials,
})
export const getRawmaterialsFail = error => ({
  type: GET_RAWMATERIALS_FAIL,
  payload: error,
})
export const createRawmaterial = rawmaterial => ({
  type: CREATE_RAWMATERIAL,
  payload: rawmaterial,
})

export const createRawmaterialSuccess = rawmaterial => ({
  type: CREATE_RAWMATERIAL_SUCCESS,
  payload: rawmaterial,
})

export const createRawmaterialFail = error => ({
  type: CREATE_RAWMATERIAL_FAIL,
  payload: error,
})

export const deleteRawmaterial = rawmaterialId => ({
  type: DELETE_RAWMATERIAL,
  rawmaterialId,
})

export const deleteRawmaterialSuccess = rawmaterial => ({
  type: DELETE_RAWMATERIAL_SUCCESS,
  payload: rawmaterial,
})

export const deleteRawmaterialFail = error => ({
  type: DELETE_RAWMATERIAL_FAIL,
  payload: error,
})

// finishd product

export const getFinishedProduct = (searchText, page) => ({
  type: GET_FINISHEDPRODUCT,
  payload: { searchText, page },
})

export const getFinishedProductSuccess = Fproduct => ({
  type: GET_FINISHEDPRODUCT_SUCCESS,
  payload: Fproduct,
})
export const getFinishedProductFail = error => ({
  type: GET_FINISHEDPRODUCT_FAIL,
  payload: error,
})

export const createFinishedProduct = fproduct => ({
  type: CREATE_FINISHEDPRODUCT,
  payload: fproduct,
})

export const createFinishedProductSuccess = fproduct => ({
  type: CREATE_FINISHEDPRODUCT_SUCCESS,
  payload: fproduct,
})

export const createFinishedProductFail = error => ({
  type: CREATE_FINISHEDPRODUCT_FAIL,
  payload: error,
})

export const finishedDetails = id => ({
  type: FINISHEDDETAILS,
  payload: id,
})

export const finishedDetailsSuccess = data => ({
  type: FINISHEDDETAILS_SUCCESS,
  payload: data,
})

export const finishedDetailsFail = error => ({
  type: FINISHEDDETAILS_FAIL,
  payload: error,
})
