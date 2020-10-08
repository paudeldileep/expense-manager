import React from 'react'
import PropTypes from 'prop-types'
import Expensecm from './Expensecm'
import Searchexp from './Searchexp'

const Home = props => {
    return (
        <>
        <Expensecm/>
        <Searchexp/>
        </>
    )
}

Home.propTypes = {

}

export default Home
