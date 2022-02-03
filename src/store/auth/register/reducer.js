import {
  REGISTER_USER,
  REGISTER_SUCCESS,

  REGISTER_OTP,
  REGISTER_OTP_SUCCESS,
  
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  user: [],
  otp:{},
}

const register = (state = initialState, action) => {
  switch (action.type) {
    
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
      }
      break

      case REGISTER_OTP:
        state = {
          ...state,
          loading: true,
        }
        break
      case REGISTER_OTP_SUCCESS:
        state = {
          ...state,
          loading: false,
          otp: action.payload,
        }
        break
    
    default:
      state = { ...state }
      break
  }
  return state
}

export default register
