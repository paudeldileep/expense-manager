import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import axios from "axios"

import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

import { setAlert } from "../../../actions/alert"
import { getexpcm } from "../../../actions/expense"
import Spinner from "react-bootstrap/esm/Spinner"

const Expensecm = ({ getexpcm, setAlert }) => {
  const [expmonth, setExpmonth] = useState(0)
  const [expday, setExpday] = useState(0)
  const [expyesterday, setExpyesterday] = useState(0)
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/exp/cm")

        const data = res.data
        if (data) {
          setIsloading(false)
          //console.log(data)
          setExpmonth(data.month.totalSpent)
          setExpday(data.today.totalSpent)
          setExpyesterday(data.yesterday.totalSpent)
        }
      } catch (err) {
        console.log(err)
        setAlert(err, "danger-bg")
      }
    }
    getdata()
  }, [])

  return (
    <>
      {isloading ? (
        <Spinner message='Please wait..' />
      ) : (
        <div className='expcm-div mt-2'>
          <Card className='expcm-div-card'>
            <Card.Header className='text-center'> <h4 className='white-text'>At a Glance</h4></Card.Header>
            <Card.Body>
              <Container fluid>
                <Row className="text-center">
                  <Col xs={12} md={6} lg={6} className='text-center p-1 mb-2'>
                    <div className='round-div'>
                      <h6 className="white-text">This Month</h6>

                      <h5 className="white-text">Nrs.{expmonth}</h5>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={6} className='text-center p-1'>
                    <div className='rect-div-cm'>
                      <h6 className="white-text">Today</h6>
                      <p className="white-text">Nrs.{expday}</p>
                    </div>
                    <div className='rect-div-cm'>
                      <h6 className="white-text">Yesterday</h6>
                      <p className="white-text">Nrs.{expyesterday}</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  )
}

Expensecm.propTypes = {}

export default connect(null, { getexpcm, setAlert })(Expensecm)
