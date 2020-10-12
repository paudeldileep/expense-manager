import React from "react"



import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

const Expensecm = ({expense}) => {
 //console.log(expense)
  return (
    <>
      <div className='expcm-div mt-2'>
        <Card className='expcm-div-card'>
          <Card.Header className='text-center'>
            {" "}
            <h4 className='white-text'>At a Glance</h4>
          </Card.Header>
          <Card.Body>
            <Container fluid>
              <Row className='text-center'>
                <Col xs={12} md={6} lg={6} className='text-center p-1 mb-2'>
                  <div className='round-div'>
                    <h6 className='white-text'>This Month</h6>

                    <h5 className='white-text'>Nrs.{expense.month ? expense.month.totalSpent : 0}</h5>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={6} className='text-center p-1'>
                  <div className='rect-div-cm'>
                    <h6 className='white-text'>Today</h6>
                    <p className='white-text'>Nrs.{expense.today ? expense.today.totalSpent : 0}</p>
                  </div>
                  <div className='rect-div-cm'>
                    <h6 className='white-text'>Yesterday</h6>
                    <p className='white-text'>Nrs.{expense.yesterday ? expense.yesterday.totalSpent : 0}</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
     
    </>
  )
}

export default Expensecm
