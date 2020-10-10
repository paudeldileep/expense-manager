import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Container from "react-bootstrap/esm/Container"

import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import { getexpploty } from "../../../../actions/expense"

import {VictoryTheme, VictoryAxis, VictoryBar, VictoryChart} from "victory"

const Yearlyplot = ({ plot, getexpploty }) => {
  const [isloading, setisloading] = useState(true)
  const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //useState hooks

  const [year, setyear] = useState('2020')

  const onSubmit = async (e) => {
    e.preventDefault()

   // console.log(year)
    getexpploty(year)
    //getexp({ startdate, enddate })
  }
  return (
    <Container fluid>
      <div className="y-plot-search-div">
        <Form onSubmit={onSubmit}>
          <Form.Row className='align-items-center justify-content-center'>
            <Col xs='auto'>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>Year</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type='number'
                  min='1900'
                  max='2099'
                  step='1'
                  name='year'
                  onChange={(e) => setyear(e.target.value)}
                  value={year}
                />
              </InputGroup>
            </Col>
            <Col xs='auto'>
              <Button type='submit' className='mb-2'>
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
      {!plot ? (<p>search something</p>):(
      <div className="y-plot-result-div">
      <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={300}
                width={450}>
                <VictoryAxis/>
                <VictoryBar
                    categories={{
                        x: monthStrings
                    }}
                    style={{ data: { fill: "#69f0ae", width: 20 }, labels: {fill: "#01579b"} }}
                    data={plot.monthTot}
                    x={monthStrings['x']}
                    domain={{x: [0, 13]}}
                    labels={({ datum }) => `Nrs.${datum.y}`}
                />
          </VictoryChart>
      </div>
      )}
    </Container>
  )
}

Yearlyplot.propTypes = {}
const mapStateToProps = (state) => ({
  plot: state.expense.ploty,
})

export default connect(mapStateToProps, { getexpploty })(Yearlyplot)
