import React, { useState } from "react"
import PropTypes from "prop-types"
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom"

import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

import {login} from '../../actions/auth'

import Error from '../layout/Error/Error'
import Spinner from '../layout/Spinner'

const Login = ({login,auth:{isAuthenticated,user,isloading}}) => {
  //useState hooks
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

   // console.log(formData)
    login({ email, password })
  }

  //Redirect if logged in
  if (isAuthenticated && user !== null) {
     return <Redirect to='/home' />
  }

  return (
    <>
    {isloading ? ( <Spinner message='Logging In..'/> ) : (
      <div className='login-card mt-4'>
        <Error/>
      <Card >
        <Card.Body>
          <p className='text-center'>
            <i className='fa fa-user-circle fa-5x color-blue'></i>
          </p>

          <Form className='pt-3' onSubmit={onSubmit}>
            <Form.Group controlId='Email'>
              <Form.Label srOnly>Email address</Form.Label>
              <Form.Control type='email' name='email' placeholder='Email' value={email} onChange={onChange} />
            </Form.Group>

            <Form.Group controlId='Password'>
              <Form.Label srOnly>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Password'
                value={password} onChange={onChange}
              />
            </Form.Group>

            <Button className='bg-blue' block type='submit'>
              LogIn
            </Button>
            <p className='signup-link mt-2 text-center'>
              First time here? <Link to='/signup'>Sign Up</Link>
            </p>
          </Form>
        </Card.Body>
        <Card.Footer className='text-center'>
          <h6 className='color-blue'>-------OR-------</h6>
          <Button variant='primary' type='button' className='mr-2'>
            <i className='fa fa-facebook-official' aria-hidden='true'></i> FaceBook
          </Button>
          <Button variant='primary' type='button'>
            <i className='fa fa-google' aria-hidden='true'></i> Google
          </Button>
        </Card.Footer>
      </Card>
      </div>
    ) }
    </>
  )
}

Login.propTypes = {}

const mapStateToProps = (state) => ({
  auth: state.auth,

})

export default connect(mapStateToProps,{login})(Login)
