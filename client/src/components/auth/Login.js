import React from "react"
import PropTypes from "prop-types"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { PersonCircle } from "react-bootstrap-icons"

const Login = (props) => {
  return (
    <>
      <Form className="mt-4">
        <h3 className='text-center'>
          <PersonCircle style={{ color: "#023E8A" }} size={100} />
        </h3>
        <Form.Group controlId='Email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' name='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group controlId='Password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
          />
        </Form.Group>

        <Button variant='primary' block type='submit'>
          LogIn
        </Button>
      </Form>
    </>
  )
}

Login.propTypes = {}

export default Login
