import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getexpcg } from "../../../actions/expense"
import Container from "react-bootstrap/esm/Container"
import Card from "react-bootstrap/esm/Card"

const ExpCategory = ({ expcg, getexpcg }) => {
  
  useEffect(() => {
    getexpcg()
{/*
    return () => {
      console.log("cleanup")
    }
     */}
  }, [getexpcg])

  const datacg = () => {
    if (expcg) {
      return expcg.map((cat, index) => (
        <Card key={index} className="categories-div-card">
          <Card.Header>
            <Card.Title className="grey-text">{cat._id}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text className='text-center grey-text'>
              <span className="categories-div-card-text mr-3">Total :NRs.{cat.expenses.total}</span>
              <span className="categories-div-card-text ml-3"> Average :NRs.{cat.expenses.average}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      ))
    }
  }

  return (
    <Container fluid>
      <div className='categories-div mt-2'>{datacg()}</div>
    </Container>
  )
}

ExpCategory.propTypes = {
  getexpcg: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  expcg: state.expense.expcg,
})

export default connect(mapStateToProps, { getexpcg })(ExpCategory)
