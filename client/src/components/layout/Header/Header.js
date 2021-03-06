import React, { Fragment } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Button from "react-bootstrap/Button"
import { logout } from "../../../actions/auth"
import GoogleAuth from "../../auth/GoogleAuth"

const Header = ({
  auth: { isAuthenticated, loading, gloginstatus },
  logout,
}) => {
  const AuthLinks = (
    <>
      <Nav.Link as={Link} to='/addexpense'>
        <Button className='bg-bgreen' size='sm'>
          <i className='fa fa-plus color-white'></i>Add Expense
        </Button>
      </Nav.Link>
      <Nav.Link as={Link} to='/search'>
        <Button className='bg-bgreen' size='sm'>
          <i className='fa fa-search color-white'></i>Search
        </Button>
      </Nav.Link>
      <Nav.Link as={Link} to='/plots'>
        <Button className='bg-bgreen' size='sm'>
          <i className='fa fa-line-chart color-white'></i>Analyze
        </Button>
      </Nav.Link>
      <Nav.Link >
        {gloginstatus ? (
          <GoogleAuth />
        ) : (
          <Button as={Link} to='/' onClick={logout} className='bg-red' size='sm'>
            <i className='fa fa-sign-out color-white'></i> Sign Out
          </Button>
        )}
      </Nav.Link>
    </>
  )

  const CommonLinks = (
    <Fragment>
      <Nav.Link as={Link} to='/'>
        <span className='nav-text'>About</span>
      </Nav.Link>
      <Nav.Link as={Link} to='/'>
        <span className='nav-text'>News</span>
      </Nav.Link>
    </Fragment>
  )

  return (
    <>
      <Navbar className='header' collapseOnSelect expand='md'>
        <Navbar.Brand as={Link} to='/'>
          <img
            src='/assets/em_logo_f.png'
            className='d-inline-block align-top'
            alt='Expense-Manager-Logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto nav-link'>{CommonLinks}</Nav>
          <Nav className='mr-0'>{!loading && isAuthenticated && AuthLinks}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logout })(Header)
