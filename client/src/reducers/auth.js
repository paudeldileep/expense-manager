import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  NOT_LOADING,
  OLOGIN_SUCCESS
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  isloading: false,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case LOADING:
      return {
        ...state,
        isloading: true,
      }
    case NOT_LOADING:
      return {
        ...state,
        isloading: false,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        isloading: false,
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isloading: false,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTER_FAIL:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        isloading: false,
      }
      case OLOGIN_SUCCESS:
        return{
          ...state,
          isAuthenticated:true
        }
    default:
      return state
  }
}
