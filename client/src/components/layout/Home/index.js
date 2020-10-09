import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Expensecm from "./Expensecm"

import Searchresult from "./Searchresult"

import { getexpcm } from "../../../actions/expense"
import Spinner from "../Spinner"

import { Fade } from "react-awesome-reveal"

const Home = ({ expense: { expcm }, getexpcm }) => {
  const [expmonth, setExpmonth] = useState(0)
  const [exptoday, setExptoday] = useState(0)
  const [expyesterday, setExpyesterday] = useState(0)

  const[isloading,setisloading]=useState(true);

  useEffect(() => {
      if(!expcm){
        getexpcm()
      }
    if(expcm) {
        setExpmonth(expcm.month.totalSpent)
        setExptoday(expcm.today.totalSpent)
        setExpyesterday(expcm.yesterday.totalSpent)
        setisloading(false)
      }
  }, [expcm])

  
  return (
    <>
    <Fade>
      {isloading ? (
        <Spinner message='Please wait..' />
      ) : (
        <>
          <Expensecm
            expmonth={expmonth}
            exptoday={exptoday}
            expyesterday={expyesterday}
          />
          <Searchresult />
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
