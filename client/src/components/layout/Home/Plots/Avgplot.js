import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getexpplotavg } from "../../../../actions/expense"
import Searchexp from "../Searchexp"

import { VictoryPie, VictoryTheme, VictoryLabel } from "victory"
import Container from "react-bootstrap/esm/Container"

const Avgplot = ({ getexpplotavg, plot }) => {
  const [isloading, setisloading] = useState(true)

  //useState hooks

  const [formData, setFormData] = useState({
    startdate: "",
    enddate: "",
  })

  const { startdate, enddate } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    //console.log({startdate,enddate})
    getexpplotavg({ startdate, enddate })
  }
  return (
    <Container fluid>
      <span className='plot-header'>Monthly Average Expense Plot</span>
      <div className='search-div text-center'>
        <Searchexp
          onDataChange={onChange}
          onFormSubmit={onSubmit}
          data={formData}
        />
      </div>

      {!plot ? (
        <>
          {" "}
          <p className="search-text text-center">Please select a date range</p>
        </>
      ) : (
        <div className='avg-plot-result-div'>
          <svg viewBox='0 0 320 320'>
            <VictoryPie
              standalone={false}
              data={plot.avgdata}
              innerRadius={50}
              theme={VictoryTheme.material}
              labelRadius={({ innerRadius }) => innerRadius + 14}
              labelComponent={
                <VictoryLabel
                  angle={0}
                  style={[
                    {
                      fontSize: "8px",
                      fill: "#0f0f0f",
                    },
                    {
                      fontSize: "10px",
                      fill: "#013157",
                    },
                  ]}
                  text={({ datum }) => `${datum.x}\n NRs.${datum.y}`}
                />
              }
            />
            <VictoryLabel
              textAnchor='middle'
              style={{ fontSize: 12, fill: "#8b8b8b" }}
              x={175}
              y={170}
              text={`Expense \nper category`}
            />
          </svg>
        </div>
      )}
    </Container>
  )
}

Avgplot.propTypes = {}

const mapStateToProps = (state) => ({
  plot: state.expense.plotavg,
})

export default connect(mapStateToProps, { getexpplotavg })(Avgplot)
