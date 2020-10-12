import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Expensecm from "./Expensecm"



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
