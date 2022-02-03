import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  RECOVERY_OTP,
  RECOVERY_OTP_SUCCESS,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  user: [],
  forgetSuccessMsg: "",
  forgetError: "",
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload }
      break

      case RECOVERY_OTP:
        state = {
          ...state,
          loading: true,
        }
        break
      case RECOVERY_OTP_SUCCESS:
        state = {
          ...state,
          loading: false,
          otp: action.payload,
        }
        break
    


    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
      }
      break
    case LOGOUT_USER:
      state = { ...state, loading: true, user: [] }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state, loading: false }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
