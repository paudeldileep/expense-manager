import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import InputGroup from "react-bootstrap/InputGroup"


import { addexpense } from "../../../actions/expense"
import { setAlert } from "../../../actions/alert"

import Error from "../../layout/Error/Error"
import Spinner from "../../layout/Spinner"

const Addexpense = ({
  addexpense,
  auth: { isAuthenticated, user, isloading },
  setAlert
}) => {
  //useState hooks
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    incurred_on: "",
    notes: "",
  })

  //Redirect if logged in
  if (!isAuthenticated && user == null) {
    return <Redirect to='/' />
  }

  const { title, amount, category, incurred_on, notes } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (incurred_on > maxDate) {
      alert("you cannot select a future date")
      return false
    }

    if(!amount || !title || category===""){
      setAlert("Please provide amount,title and category","danger-bg");
      return false;
    }
    else{
    //console.log(formData)
    addexpense(formData);
    }
  }

  const resetForm = () => {
    setFormData({
      ...formData,
      title: "",
      amount: "",
      category: "",
      incurred_on: "",
      notes: "",
    })
  }

  //get current date
  const now = new Date()
  // minimum date the user can choose, in this case now and in the future
  const maxDate = now.toISOString().substring(0, 10)

  return (
    <>
      {isloading ? (
        <Spinner message='Saving...' />
      ) : (
        <div className='addexpense-card mt-2'>
          <Error />
          <Card>
            <Card.Body>
              <p className='text-center'>
                <i className='fa fa-file-text fa-3x color-blue'></i>
              </p>
              <p className='text-center'>Add New Expense</p>

              <Form className='pt-3' onSubmit={onSubmit}>
                <Form.Group controlId='title'>
                  <Form.Label srOnly>Expense title</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    placeholder='Spent for..'
                    value={title}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group controlId='Amount'>
                  <Form.Label srOnly>Expense Amount</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>NRs.</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='text'
                      name='amount'
                      placeholder='Amount Spent'
                      value={amount}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <Form.Text className='text-muted pl-2'>
                    Minimum amount should be zero.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='title'>
                  <Form.Label srOnly>Expense Category</Form.Label>
                  <Form.Control
                    as='select'
                    name='category'
                    value={category}
                    onChange={onChange}
                  >
                    <option value=''>Expense Category</option>
                    <option value='Groceries'>Groceries</option>
                    <option value='Vegetables'>Vegitables</option>
                    <option value='Junk Food'>Junk foods</option>
                    <option value='Electricity'>Electricity</option>
                    <option value='Telephone'>Telephone</option>
                    <option value='Water'>Water</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='Travels'>Travels</option>
                    <option value='Utensils'>Utensils</option>
                    <option value='Insurance'>Insurance</option>
                    <option value='Shares'>Shares</option>
                    <option value='Chocolates'>Choc0lates</option>
                    <option value='Dress'>Dress</option>
                    <option value='Home Rent'>Home Rent</option>
                    <option value='Extras'>Extras</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='Date'>
                  <Form.Label srOnly>Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='incurred_on'
                    max={maxDate}
                    value={incurred_on}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group controlId='Notes'>
                  <Form.Label srOnly>Notes</Form.Label>
                  <Form.Control
                    as='textarea'
                    name='notes'
                    placeholder='Any details..'
                    value={notes}
                    rows='2'
                    onChange={onChange}
                  />
                </Form.Group>
                <p className='text-center'>
                  <Button className='bg-blue button-width' type='submit'>
                    Save
                  </Button>
                  <Button
                    className='bg-blue button-width'
                    type='button'
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                </p>
                <p className='text-center color-orange'>
                  &copy; Expense-Manager 2020
                </p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  )
}

Addexpense.propTypes = {}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { addexpense,setAlert })(Addexpense)
