import {
  GET_EXPCM,
  EXPCM_FAIL,
  LOADING,
  NOT_LOADING,
  CLEAR_EXPCM,
  CLEAR_EXP,
  GET_EXP,
  EXP_FAIL,
  CLEAR_EXPCG,
  GET_EXPCG,
  EXPCG_FAIL,
  CLEAR_PLOTM,
  GET_PLOTM,
  PLOTM_FAIL,
  CLEAR_PLOTAVG,
  GET_PLOTAVG,
  PLOTAVG_FAIL,
  CLEAR_PLOTY,
  GET_PLOTY,
  PLOTY_FAIL,
  EXP_ADDED,
  EXP_NOT_ADDED
} from "../actions/types"

const initialState = {
  expsearch: [],
  expcm: null,
  expcg: [],
  plotm: null,
  plotavg:null,
  ploty:null,
  loading: true,
  expadded:false,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CLEAR_EXPCM:
      return {
        ...state,
        expcm: null,
        loading: false,
      }
      case EXP_ADDED:
      return {
        ...state,
        expadded: true,
      }
      case EXP_NOT_ADDED:
      return {
        ...state,
        expadded: false,
      }
    case GET_EXPCM:
      return {
        ...state,
        expcm: payload,
        loading: false,
      }
    case EXPCM_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_EXP:
      return {
        ...state,
        expsearch: [],
        loading: false,
      }
    case GET_EXP:
      return {
        ...state,
        expsearch: payload,
        loading: false,
      }
    case EXP_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_EXPCG:
      return {
        ...state,
        expcg: [],
        loading: false,
      }
    case GET_EXPCG:
      return {
        ...state,
        expcg: payload,
        loading: false,
      }
    case EXPCG_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_PLOTM:
      return {
        ...state,
        plotm: null,
        loading: false,
      }
    case GET_PLOTM:
      return {
        ...state,
        plotm: payload,
        loading: false,
      }
    case PLOTM_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }
      case CLEAR_PLOTAVG:
      return {
        ...state,
        plotavg: null,
        loading: false,
      }
    case GET_PLOTAVG:
      return {
        ...state,
        plotavg: payload,
        loading: false,
      }
    case PLOTAVG_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }
      case CLEAR_PLOTY:
        return {
          ...state,
          ploty: null,
          loading: false,
        }
      case GET_PLOTY:
        return {
          ...state,
          ploty: payload,
          loading: false,
        }
      case PLOTY_FAIL:
        return {
          ...state,
          error: payload,
          loading: false,
        }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case NOT_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
