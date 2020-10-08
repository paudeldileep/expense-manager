import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import  Alert  from "react-bootstrap/Alert"
import { Fade } from "react-awesome-reveal"

const Error = ({alerts}) =>alerts !== null &&
alerts.length > 0 &&
alerts.map((alert) => (
  <Fade>
  <div key={alert.id} id="error-div" className={`${alert.type}`}>
    <Alert>
      {alert.msg}
    </Alert>
  </div>
  </Fade>
))

Error.propTypes = {
    alerts: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
    alerts: state.alert,
  })

  export default connect(mapStateToProps)(Error)
