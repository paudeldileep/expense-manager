import axios from "axios"
import { setAlert } from "./alert"
import {
  LOADING,
  NOT_LOADING,
  GET_EXPCM,
  CLEAR_EXPCM,
  EXPCM_FAIL,
  GET_EXP,
  CLEAR_EXP,
  EXP_FAIL,
  CLEAR_EXPCG,
  GET_EXPCG,
  EXPCG_FAIL,
} from "./types"

export const addexpense = (formData) => async (dispatch) => {
  //dispatch({ type: LOADING })

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.post("/api/exp", body, config)

    //dispatch({ type: NOT_LOADING })
    dispatch(setAlert(res.data.msg, "success-bg"))
  } catch (err) {
    //console.error(err.response.data);
    //dispatch({ type: NOT_LOADING })
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger-bg")))
    }
   
  }
}

export const getexpcm = () => async (dispatch) => {
  //dispatch({ type: LOADING })
  dispatch({ type: CLEAR_EXPCM })

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.get("/api/exp/cm",config)
    //dispatch({ type: NOT_LOADING })
    dispatch({ type: GET_EXPCM, payload: res.data })
  } catch (err) {
    console.log(err)

    //dispatch({
      //type: EXPCM_FAIL,
      //payload: { msg: err.response.statusText, status: err.response.status },
    //})
    //dispatch({ type: NOT_LOADING })
  }
}

export const getexp = ({ startdate, enddate }) => async (dispatch) => {
  //dispatch({ type: LOADING })
  dispatch({ type: CLEAR_EXP })

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      startdate: startdate,
      enddate: enddate,
    },
  }
  try {
    const res = await axios.get("/api/exp", config)
    //dispatch({ type: NOT_LOADING })
    dispatch({ type: GET_EXP, payload: res.data })
  } catch (err) {
    console.log(err)
    dispatch({
      type: EXP_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
    //dispatch({ type: NOT_LOADING })
  }
}

export const getexpcg = () => async (dispatch) => {
  //dispatch({ type: LOADING })
  dispatch({type: CLEAR_EXPCG})

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const res = await axios.get("/api/exp/cg", config)

    //dispatch({ type: NOT_LOADING })
    dispatch({ type: GET_EXPCG, payload: res.data })
  } catch (err) {
    console.log(err)
    dispatch({
      type: EXPCG_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
    //dispatch({ type: NOT_LOADING })
  }

}