import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Container from "react-bootstrap/esm/Container"
import { getexp } from "../../../actions/expense"

import Expdatasearch from "./Expdatasearch"
import Searchexp from "./Searchexp"
import { connect } from "react-redux"


const Searchresult = ({ expense, getexp }) => {
  const [expdata, setexpdata] = useState([])
  const[isloading,setisloading]=useState(true);

  useEffect(() => {
    if (expense.length>0) {
      setexpdata(expense)
      setisloading(false)
     
    }
    
  }, [expense])

  //console.log(expdata)
  //useState hooks

  const [formData, setFormData] = useState({
    startdate: "",
    enddate: "",
  })

  const { startdate, enddate } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log(formData)
    getexp({ startdate, enddate })
  }

  return (
    <Container fluid>
      <div className='search-div text-center'>
        <Searchexp
          onDataChange={onChange}
          onFormSubmit={onSubmit}
          data={formData}
        />
      </div>
      {isloading ?(
        <div className='text-center info-div'>
        <p className="white-text">Please seacrh expenses between certain date!</p>
      </div>
      ): (
        <div className='text-center search-result-div'>
          <Expdatasearch searchdata={expdata} />
        </div>
      ) }
    </Container>
  )
}

Searchresult.propTypes = {
  getexp: PropTypes.func.isRequired,
  
}

const mapStateToProps = (state) => ({
  expense: state.expense.expsearch,
})

export default connect(mapStateToProps, { getexp })(Searchresult)
