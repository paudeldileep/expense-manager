import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Container from "react-bootstrap/esm/Container"
import { getexp } from "../../../actions/expense"

import Expdatasearch from "./Expdatasearch"
import Searchexp from "./Searchexp"
import { connect } from "react-redux"

import {deleteexp} from '../../../actions/expense'
import Error from '../Error/Error'


const Searchresult = ({ expense, getexp,deleteexp }) => {

  const [expdata, setexpdata] = useState([])
  const[isloading,setisloading]=useState(true);

  useEffect(() => {
    if (expense.length>0) {
      setexpdata(expense)
      setisloading(false)
     
    }
    
  }, [expense])

  const removeexpdata = (exp) => {
    if(window.confirm('Are you sure to delete this?')){
    const updatedexpdata = [...expdata]
    const index = updatedexpdata.indexOf(exp)
    updatedexpdata.splice(index, 1)
    setexpdata(updatedexpdata)

    deleteexp(exp._id)
    }
}

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
          <Error/>
          <Expdatasearch searchdata={expdata} removeexp={removeexpdata}/>
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

export default connect(mapStateToProps, { getexp,deleteexp})(Searchresult)
