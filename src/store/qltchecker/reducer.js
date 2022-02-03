import {
  GET_QLTCHECKERS_SUCCESS,
  GET_QLTCHECKERS_FAIL,
  GET_QLTCHECKER_DETAIL_SUCCESS,
  GET_QLTCHECKER_DETAIL_FAIL,
  CREATE_QLTCHECKER_SUCCESS,
  CREATE_QLTCHECKER_FAIL,
  UPLOAD_QLTCHECKER,
  UPLOAD_QLTCHECKER_SUCCESS,
  UPLOAD_QLTCHECKER_FAIL,
  UPDATE_QLTCHECKER_SUCCESS,
  UPDATE_QLTCHECKER_FAIL,
  DELETE_QLTCHECKER_SUCCESS,
  DELETE_QLTCHECKER_FAIL,
  GET_QLTCHECKERS,
  GET_QLTCHECKER_DETAIL,
  UPDATE_QLTCHECKER,
  CREATE_QLTCHECKER,
  DELETE_QLTCHECKER,
} from "./actionTypes"

const INIT_STATE = {
  qltcheckers: [],
  qltcheckerDetail: {
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
  // createQltcheckererror: "",
}

const Qltcheckers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QLTCHECKERS:
    case UPDATE_QLTCHECKER:
    case CREATE_QLTCHECKER:
    case UPLOAD_QLTCHECKER:
    case DELETE_QLTCHECKER:
      return {
        ...state,
        loading: true,
      }
    case GET_QLTCHECKER_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_QLTCHECKERS_SUCCESS:
      return {
        ...state,
        qltcheckers: action.payload,
        loading: false,
      }

    case GET_QLTCHECKERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_QLTCHECKER_SUCCESS:
      return {
        ...state,
        qltcheckers: action.payload,
        loading: false,
      }

    case CREATE_QLTCHECKER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPLOAD_QLTCHECKER_SUCCESS:
      return {
        ...state,
        qltcheckers: action.payload,
        loading: false,
      }

    case UPLOAD_QLTCHECKER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }


    case GET_QLTCHECKER_DETAIL_SUCCESS:
      return {
        ...state,
        qltcheckerDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_QLTCHECKER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_QLTCHECKER_SUCCESS:
      return {
        ...state,
        qltcheckers: state.qltcheckers.map(qltchecker =>
          qltchecker.id.toString() === action.payload.id.toString()
            ? { qltchecker, ...action.payload }
            : qltchecker
        ),
        qltcheckerDetail: action.payload,
        loading: false,
      }

    case UPDATE_QLTCHECKER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_QLTCHECKER_SUCCESS:
      return {
        ...state,
        qltcheckers: state.qltcheckers.filter(
          qltchecker =>
            qltchecker.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_QLTCHECKER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Qltcheckers
