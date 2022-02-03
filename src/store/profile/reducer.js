import {
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  userPass: {},
  error: {},
  loading: false,
}

const Contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        loading: true,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
        loading: false,
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        userPass: action.payload,
        loading: false,
      }

    case UPDATE_USER_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Contacts
