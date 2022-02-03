import { getProductDetail } from "store/actions"
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAIL,
  GET_APPLICATION_DETAIL_SUCCESS,
  GET_APPLICATION_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  //other cost
  CREATE_OTHERCOST,
  CREATE_OTHERCOST_SUCCESS,
  CREATE_OTHERCOST_FAIL,
  DELETE_OTHERCOST,
  DELETE_OTHERCOST_SUCCESS,
  DELETE_OTHERCOST_FAIL,
  //rawmaterials
  GET_RAWMATERIALS_SUCCESS,
  GET_RAWMATERIALS_FAIL,
  CREATE_RAWMATERIAL_SUCCESS,
  CREATE_RAWMATERIAL_FAIL,
  DELETE_RAWMATERIAL_SUCCESS,
  DELETE_RAWMATERIAL_FAIL,
  GET_RAWMATERIALS,
  CREATE_RAWMATERIAL,
  DELETE_RAWMATERIAL,
  //finshed product
  GET_FINISHEDPRODUCT,
  GET_FINISHEDPRODUCT_SUCCESS,
  GET_FINISHEDPRODUCT_FAIL,
  CREATE_FINISHEDPRODUCT_SUCCESS,
  CREATE_FINISHEDPRODUCT_FAIL,
  FINISHEDDETAILS_SUCCESS,
  FINISHEDDETAILS_FAIL,
  FINISHEDDETAILS,
  GET_APPLICATION,
  GET_APPLICATION_DETAIL,
} from "./actionTypes"

const INIT_STATE = {
  products: [],
  applications: [],
  finishedProduct: [],
  applicationDetail: {},
  productDetail: {
    id: "",
    name: "",
    no_of_cols: "",
    cost: "",
    profit: "",
    price: "",
    rawmaterial: [],
    othercost: [],
    loading: false,
  },
  error: {},
  loading: false,
  finishProdLoading: false,
  createProducterror: null,
  createdOtherCost: {},
  createdRawMaterial: {},
  finishedProdDetails: [],
  finishedDeatailLoading: false,
}

const Products = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_APPLICATION:
    case GET_APPLICATION_DETAIL:
    case GET_PRODUCT_DETAIL:
    case UPDATE_PRODUCT:
    case CREATE_PRODUCT:
    case DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
      }
    case CREATE_OTHERCOST:
    case DELETE_OTHERCOST:
    case GET_RAWMATERIALS:
    case CREATE_RAWMATERIAL:
    case DELETE_RAWMATERIAL:
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          loading: true,
        },
      }
    case GET_FINISHEDPRODUCT:
      return {
        ...state,
        finishProdLoading: true,
      }

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      }

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_APPLICATION_SUCCESS:
      return {
        ...state,
        applications: action.payload,
        loading: false,
      }

    case GET_APPLICATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_APPLICATION_DETAIL_SUCCESS:
      return {
        ...state,
        applicationDetail: { ...state.applicationDetail, ...action.payload },
        loading: false,
      }

    case GET_APPLICATION_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
      
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        createProducterror: null,
        loading: false,
      }

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        createProducterror: action.payload,
        loading: false,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: { ...state.productDetail, ...action.payload },
        loading: false,
      }

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product =>
          product.id.toString() === action.payload.id.toString()
            ? { product, ...action.payload }
            : product
        ),
        loading: false,
      }

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          product => product.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    //other cost
    case CREATE_OTHERCOST_SUCCESS:
      return {
        ...state,
        createdOtherCost: action.payload,
        productDetail: {
          ...state.productDetail,
          othercost: [...state.productDetail.othercost, action.payload],
          loading: false,
        },
      }

    case CREATE_OTHERCOST_FAIL:
      return {
        ...state,
        productDetail: {
          loading: false,
        },
      }

    case DELETE_OTHERCOST_SUCCESS:
      return {
        ...state,
        createdOtherCost: {},
        productDetail: {
          ...state.productDetail,
          othercost: [
            ...state.productDetail.othercost.filter(
              otherCost => otherCost.id !== action.payload.id
            ),
          ],
        },
        loading: false,
      }

    case DELETE_OTHERCOST_FAIL:
      return {
        ...state,
        error: action.payload,
        productDetail: {
          loading: true,
        },
      }

    //rawmateril
    case GET_RAWMATERIALS_SUCCESS:
      return {
        ...state,
        rawmaterials: action.payload,
        loading: false,
      }

    case GET_RAWMATERIALS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_RAWMATERIAL_SUCCESS:
      return {
        ...state,
        createdRawMaterial: action.payload,
        productDetail: {
          ...state.productDetail,
          rawmaterial: [...state.productDetail.rawmaterial, action.payload],
          loading: false,
        },
      }

    case CREATE_RAWMATERIAL_FAIL:
      return {
        ...state,
        createRawmaterialerror: action.payload,
        loading: false,
      }

    case DELETE_RAWMATERIAL_SUCCESS:
      return {
        ...state,
        createdRawMaterial: {},
        productDetail: {
          ...state.productDetail,
          rawmaterial: [
            ...state.productDetail.rawmaterial.filter(
              rawmaterial => rawmaterial.id !== action.payload.id
            ),
          ],
        },
        loading: false,
      }

    case DELETE_RAWMATERIAL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    //finished product
    case GET_FINISHEDPRODUCT_SUCCESS:
      return {
        ...state,
        finishedProduct: action.payload,
        finishProdLoading: false,
      }

    case GET_FINISHEDPRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        finishProdLoading: false,
      }
    case CREATE_FINISHEDPRODUCT_SUCCESS:
      return {
        ...state,
        finishedProduct: action.payload,
        error: null,
        finishProdLoading: false,
      }

    case CREATE_FINISHEDPRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        finishProdLoading: false,
      }
    case FINISHEDDETAILS:
      return {
        ...state,
        finishedDeatailLoading: true,
      }

    case FINISHEDDETAILS_SUCCESS:
      return {
        ...state,
        finishedProdDetails: action.payload,
        finishedDeatailLoading: false,
      }

    case FINISHEDDETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        finishedDeatailLoading: false,
      }

    default:
      return state
  }
}

export default Products
