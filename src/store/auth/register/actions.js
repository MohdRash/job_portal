import {

  REGISTER_USER,
  REGISTER_SUCCESS,

  REGISTER_OTP,
  REGISTER_OTP_SUCCESS,
  
} from "./actionTypes"


export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: user,
  }
}

export const registerUserSuccess = user => {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  }
}

export const registerOtp = otp => {
  console.log(otp)
  return {
    type: REGISTER_OTP,
    payload: otp,
  }
}

export const registerOtpSuccess = otp => {
  return {
    type: REGISTER_OTP_SUCCESS,
    payload: otp,
  }
}
