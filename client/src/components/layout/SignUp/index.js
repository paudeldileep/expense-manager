import React, { useState } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

import { setAlert } from "../../../actions/alert"
import { register } from "../../../actions/auth"

import Spinner from "../Spinner"
import Error from "../Error/Error"

const SignUp = ({
  auth: { isAuthenticated, isloading },
  setAlert,
  register,
}) => {
  //useState hooks
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || password.length < 6) {
      setAlert("Please provide all valid values","danger-bg")
    } else {
      //console.log(formData)
      register(formData);
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/home' />
  }
  return (
    <>
      {isloading ? (
        <Spinner message='Registering..' />
      ) : (
        <div className='signup-card mt-4'>
          <Error />
          <Card>
            <Card.Body>
              <p className='text-center'>
                <i className='fa fa-user-plus fa-5x color-blue'></i>
              </p>

              <Form className='pt-3' onSubmit={onSubmit}>
                <Form.Group controlId='Name'>
                  <Form.Label srOnly>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Full Name'
                    value={name}
                    onChange={onChange}
                  />
                  <Form.Text className='text-muted pl-2'>
                    eg: John Doe
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='Email'>
                  <Form.Label srOnly>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={onChange}
                  />
                  <Form.Text className='text-muted pl-2'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId='Password'>
                  <Form.Label srOnly>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={onChange}
                  />
                  <Form.Text className='text-muted pl-2'>
                    Minimum 6 characters.
                  </Form.Text>
                </Form.Group>

                <Button className='bg-blue' block type='submit'>
                  Sign Up
                </Button>
                <p className='signup-link mt-2 text-center'>
                  Got an Account? <Link to='/'>Sign In</Link>
                </p>
              </Form>
            </Card.Body>
            <Card.Footer className='text-center'>
              <p className='color-orange'>Privacy Policy</p>
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  )
}

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { setAlert, register })(SignUp)
