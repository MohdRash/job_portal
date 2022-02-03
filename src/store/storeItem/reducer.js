import {
  GET_STOREITEMS,
  GET_STOREITEM_DETAIL,
  CREATE_STOREITEM,
  UPDATE_STOREITEM,
  DELETE_STOREITEM,
  GET_STOREITEMS_SUCCESS,
  GET_STOREITEMS_FAIL,
  GET_STOREITEM_DETAIL_SUCCESS,
  GET_STOREITEM_DETAIL_FAIL,
  CREATE_STOREITEM_SUCCESS,
  CREATE_STOREITEM_FAIL,
  UPDATE_STOREITEM_SUCCESS,
  UPDATE_STOREITEM_FAIL,
  DELETE_STOREITEM_SUCCESS,
  DELETE_STOREITEM_FAIL,
  GET_STORESUPPLY_SUCCESS,
  GET_STORESUPPLY_FAIL,
  UPDATE_STORESUPPLY_FAIL,
  UPDATE_STORESUPPLY_SUCCESS,
  GET_STORESUPPLY,
} from "./actionTypes"

const INIT_STATE = {
  storeItems: [],
  storeSupply: [],
  storeItemDetail: {
    id: "",
    name: "",
    unit_type: "",
    unit: "",
    stock: "",
    price: "",
    auto_id: "",
  },
  error: {},
  loading: false,
  storeSupplyLoading: false,
  createStoreItemerror: null,
}

const StoreItems = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STOREITEMS:
    case GET_STOREITEM_DETAIL:
    case CREATE_STOREITEM:
    case UPDATE_STOREITEM:
    case DELETE_STOREITEM:
      return {
        ...state,
        loading: true,
      }
    case GET_STORESUPPLY:
      return {
        ...state,
        storeSupplyLoading: true,
      }
    case GET_STOREITEMS_SUCCESS:
      return {
        ...state,
        storeItems: action.payload,
        loading: false,
      }

    case GET_STOREITEMS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_STORESUPPLY_SUCCESS:
      return {
        ...state,
        storeSupply: action.payload,
        storeSupplyLoading: false,
      }

    case GET_STORESUPPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        storeSupplyLoading: false,
      }

    case CREATE_STOREITEM_SUCCESS:
      return {
        ...state,
        storeItems: action.payload,
        createStoreItemerror: null,
        loading: false,
      }

    case CREATE_STOREITEM_FAIL:
      return {
        ...state,
        createStoreItemerror: action.payload,
        loading: false,
      }

    case GET_STOREITEM_DETAIL_SUCCESS:
      return {
        ...state,
        storeItemDetail: action.payload,
        loading: false,
      }

    case GET_STOREITEM_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_STOREITEM_SUCCESS:
      return {
        ...state,
        storeItems: state.storeItems.results.map(storeItem =>
          storeItem.id.toString() === action.payload.id.toString()
            ? { storeItem, ...action.payload }
            : storeItem
        ),
        loading: false,
      }

    case UPDATE_STOREITEM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_STORESUPPLY_SUCCESS:
      return {
        ...state,

        storeSupply: {
          ...state.storeSupply,
          results: state.storeSupply.results.map(item =>
            item.id.toString() == action.payload.id.toString()
              ? action.payload
              : item
          ),
        },
        storeSupplyLoading: false,
      }

    case UPDATE_STORESUPPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        storeSupplyLoading: false,
      }

    case DELETE_STOREITEM_SUCCESS:
      return {
        ...state,
        storeItem: state.storeItems.results.filter(
          i => i.id.toString() !== action.payload.storeItemId.toString()
        ),
        loading: false,
      }

    case DELETE_STOREITEM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default StoreItems
