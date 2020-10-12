import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"

import Expensecm from "./Expensecm"

import Searchresult from "./Searchresult"

import { getexpcm } from "../../../actions/expense"

import Spinner from "../Spinner"

import { Fade } from "react-awesome-reveal"
import ExpCategory from "./ExpCategory"

const Home = ({ expense: { expcm }, getexpcm,auth:{isloading} }) => {
  //const dispatch =useDispatch();

  //const [expmonth, setExpmonth] = useState(0)
  //const [exptoday, setExptoday] = useState(0)
  //const [expyesterday, setExpyesterday] = useState(0)

  //const [isloading, setisloading] = useState(true)

  useEffect(() => {
    getexpcm()
    //return()=> dispatch({type:'CLEAR_EXPCM'})
  }, [getexpcm])

  {
    /* 
  const setdatavalues=()=>{
    if (expcm) {
      if (expcm.month) setExpmonth(expcm.month.totalSpent)
      if (expcm.today) setExptoday(expcm.today.totalSpent)
      if (expcm.yesterday) setExpyesterday(expcm.yesterday.totalSpent)
      setisloading(false)

      // expmonth={expmonth}
              exptoday={exptoday}
              expyesterday={expyesterday}
    }
  }
*/
  }
  return (
    <>
      <Fade>
        {isloading ? (
          <Spinner message='Please wait..' />
        ) : (
          <>
            {!expcm && <Spinner message='Loading data..' />}
            {expcm && (
              <>
                <Expensecm expense={expcm} />
                <ExpCategory />
              </>
            )}
          </>
        )}
      </Fade>
    </>
  )
}

Home.propTypes = {
  getexpcm: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  expense: state.expense,
  auth: state.auth,
})

export default connect(mapStateToProps, { getexpcm })(Home)
