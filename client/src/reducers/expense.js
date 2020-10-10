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
} from "../actions/types"

const initialState = {
  expsearch: [],
  expcm: null,
  expcg:[],
  loading: true,
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
