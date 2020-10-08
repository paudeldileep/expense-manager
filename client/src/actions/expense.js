import axios from "axios"
import { setAlert } from "./alert"
import { LOADING, NOT_LOADING } from "./types"

export const addexpense = (formData) => async (dispatch) => {
  dispatch({ type: LOADING })

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.post("/api/exp", body, config)

    dispatch({ type: NOT_LOADING })
    dispatch(setAlert(res.data.msg, "success-bg"))
  } catch (err) {
    //console.error(err.response.data);

    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger-bg")))
    }
  }
}

export const getexpcm = () => async (dispatch) => {
  dispatch({ type: LOADING })

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.get("/api/exp/cm", config)
    return await res.json()
  } catch (err) {
    console.log(err);
   // const errors = err.response.data.errors

   // if (errors) {
    //  errors.forEach((error) => dispatch(setAlert(error.msg, "danger-bg")))
   // }
  }
}
