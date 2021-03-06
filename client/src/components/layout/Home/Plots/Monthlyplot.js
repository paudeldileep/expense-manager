import React, { useState } from "react"

import { connect } from "react-redux"
import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import { getexpplotm } from "../../../../actions/expense"
import { VictoryTheme, VictoryScatter, VictoryChart, VictoryTooltip, VictoryLabel} from "victory"

const Monthlyplot = ({ plot,getexpplotm }) => {
  

  //useState hooks

  const [month, setmonth] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log(month)
    getexpplotm(month)
    //getexp({ startdate, enddate })
  }

  return (
    <Container fluid>
     <span className='plot-header'>Monthly Expense Plot</span>
      <div className='m-plot-search-div'>
        <Form onSubmit={onSubmit}>
          <Form.Row className='align-items-center justify-content-center'>
            <Col xs='auto'>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>Month</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type='month'
                  name='month'
                  onChange={(e) => setmonth(e.target.value)}
                  value={month}
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
      {!plot? (<p className="search-text text-center">Please select a month</p>):(
      <div className='m-plot-result-div'>
        <VictoryChart
          theme={VictoryTheme.material}
          height={400}
          width={550}
          domainPadding={40}
        >
          <VictoryScatter
            style={{
              data: { fill: "#01579b", stroke: "#69f0ae", strokeWidth: 2 },
              labels: { fill: "#01579b", fontSize: 10, padding: 8 },
            }}
            bubbleProperty='y'
            maxBubbleSize={15}
            minBubbleSize={5}
            labels={({ datum }) => `NRs.${datum.y} on ${datum.x}th`}
            labelComponent={<VictoryTooltip />}
            data={plot}
            domain={{ x: [0, 31] }}
          />
          <VictoryLabel
            textAnchor='middle'
            style={{ fontSize: 14, fill: "#8b8b8b" }}
            x={270}
            y={390}
            text={`day of month`}
          />
          <VictoryLabel
            textAnchor='middle'
            style={{ fontSize: 14, fill: "#8b8b8b" }}
            x={6}
            y={190}
            angle={270}
            text={`Amount (NRs)`}
          />
        </VictoryChart>
      </div>
      )}
    </Container>
  )
}



const mapStateToProps = (state) => ({
    plot: state.expense.plotm,
  })
export default connect(mapStateToProps, { getexpplotm })(Monthlyplot)
