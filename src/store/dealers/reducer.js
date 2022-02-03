import {
  GET_DEALERS_SUCCESS,
  GET_DEALERS_FAIL,
  GET_DEALER_DETAIL_SUCCESS,
  GET_DEALER_DETAIL_FAIL,
  CREATE_DEALER_SUCCESS,
  CREATE_DEALER_FAIL,
  UPDATE_DEALER_SUCCESS,
  UPDATE_DEALER_FAIL,
  DELETE_DEALER_SUCCESS,
  DELETE_DEALER_FAIL,
  GET_DEALERS,
  GET_DEALER_DETAIL,
  UPDATE_DEALER,
  CREATE_DEALER,
  DELETE_DEALER,
} from "./actionTypes"

const INIT_STATE = {
  dealers: [],
  dealerDetail: {
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
  // createDealererror: "",
}

const Dealers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEALERS:
    case UPDATE_DEALER:
    case CREATE_DEALER:
    case DELETE_DEALER:
      return {
        ...state,
        loading: true,
      }
    case GET_DEALER_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_DEALERS_SUCCESS:
      return {
        ...state,
        dealers: action.payload,
        loading: false,
      }

    case GET_DEALERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_DEALER_SUCCESS:
      return {
        ...state,
        dealers: action.payload,
        loading: false,
      }

    case CREATE_DEALER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_DEALER_DETAIL_SUCCESS:
      return {
        ...state,
        dealerDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_DEALER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_DEALER_SUCCESS:
      return {
        ...state,
        dealers: state.dealers.map(dealer =>
          dealer.id.toString() === action.payload.id.toString()
            ? { dealer, ...action.payload }
            : dealer
        ),
        loading: false,
      }

    case UPDATE_DEALER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_DEALER_SUCCESS:
      return {
        ...state,
        dealers: state.dealers.filter(
          dealer => dealer.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_DEALER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Dealers
