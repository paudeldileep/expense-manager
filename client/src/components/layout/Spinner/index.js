import React from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = (props) => {
    return (
        <Container className="align-items-center text-center" style={{'paddingTop':'30vh'}}>
            <Spinner animation="border" />
    <p>{props.message != null ? props.message: 'Loading...' }</p>
        </Container>
    )
}



export default LoadingScreen
