import React, { Fragment } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Button from "react-bootstrap/Button"
import { logout } from "../../../actions/auth"

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const AuthLinks = (
    <>
      <Nav.Link as={Link} to='/addexpense'>
        <Button className='bg-bgreen' size="sm"><i className='fa fa-plus color-white'></i>Add Expense</Button>
      </Nav.Link>
      <Nav.Link as={Link} to='/' onClick={logout}>
        <Button className='bg-red' size="sm"><i className='fa fa-sign-out color-white'></i> Sign Out</Button>
      </Nav.Link>
    </>
  )

  const CommonLinks = (
    <Fragment>
      <Nav.Link as={Link} to='/about'>
        About
      </Nav.Link>
      <Nav.Link as={Link} to='/news'>
        News
      </Nav.Link>
    </Fragment>
  )

  return (
    <>
      <Navbar className='header' collapseOnSelect expand='md'>
        <Navbar.Brand as={Link} to='/'>
          <img
            src='/assets/logo-ncit-lms.png'
            height='40'
            className='d-inline-block align-top'
            alt='Expense-Manager-Logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto nav-link'>{CommonLinks}</Nav>
          <Nav className='mr-0'>
            {!loading && isAuthenticated && AuthLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logout })(Header)
