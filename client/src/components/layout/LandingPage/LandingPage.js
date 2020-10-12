import React from 'react'

import Container from 'react-bootstrap/esm/Container'
import Login from '../../auth/Login'

const LandingPage = props => {
    return (
        <Container fluid>
            <div className="logindiv">
                <Login />
            </div>
        </Container>
    )
}


export default LandingPage
