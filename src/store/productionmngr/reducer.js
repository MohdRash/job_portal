import {
  GET_PRODUCTIONMNGRS_SUCCESS,
  GET_PRODUCTIONMNGRS_FAIL,
  GET_PRODUCTIONMNGR_DETAIL_SUCCESS,
  GET_PRODUCTIONMNGR_DETAIL_FAIL,
  CREATE_PRODUCTIONMNGR_SUCCESS,
  CREATE_PRODUCTIONMNGR_FAIL,
  UPDATE_PRODUCTIONMNGR_SUCCESS,
  UPDATE_PRODUCTIONMNGR_FAIL,
  DELETE_PRODUCTIONMNGR_SUCCESS,
  DELETE_PRODUCTIONMNGR_FAIL,
  GET_PRODUCTIONMNGRS,
  GET_PRODUCTIONMNGR_DETAIL,
  UPDATE_PRODUCTIONMNGR,
  CREATE_PRODUCTIONMNGR,
  DELETE_PRODUCTIONMNGR,
} from "./actionTypes"

const INIT_STATE = {
  productionmngrs: [],
  productionmngrDetail: {
    location: "",
    profit: "",
    account: {
      email: "",
      username: "",
      phone: "",
      first_name: "",
      last_name: "",
    },
    id: "",
  },
  error: {},
  loading: false,
  detailLoading: false,
  // createProductionmngrerror: "",
}

const Productionmngrs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTIONMNGRS:
    case UPDATE_PRODUCTIONMNGR:
    case CREATE_PRODUCTIONMNGR:
    case DELETE_PRODUCTIONMNGR:
      return {
        ...state,
        loading: true,
      }
    case GET_PRODUCTIONMNGR_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_PRODUCTIONMNGRS_SUCCESS:
      return {
        ...state,
        productionmngrs: action.payload,
        loading: false,
      }

    case GET_PRODUCTIONMNGRS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_PRODUCTIONMNGR_SUCCESS:
      return {
        ...state,
        productionmngrs: action.payload,
        loading: false,
      }

    case CREATE_PRODUCTIONMNGR_FAIL:
      return {
        ...state,
        productionmngrs: action.payload,
        loading: false,
      }

    case GET_PRODUCTIONMNGR_DETAIL_SUCCESS:
      return {
        ...state,
        productionmngrDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_PRODUCTIONMNGR_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_PRODUCTIONMNGR_SUCCESS:
      return {
        ...state,
        productionmngrs: state.productionmngrs.map(productionmngr =>
          productionmngr.id.toString() === action.payload.id.toString()
            ? { productionmngr, ...action.payload }
            : productionmngr
        ),
        loading: false,
      }

    case UPDATE_PRODUCTIONMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_PRODUCTIONMNGR_SUCCESS:
      return {
        ...state,
        productionmngrs: state.productionmngrs.filter(
          productionmngr =>
            productionmngr.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_PRODUCTIONMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Productionmngrs
