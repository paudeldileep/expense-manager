import React from "react"
import Card from "react-bootstrap/esm/Card"

const Expdatasearch = ({ searchdata }) => {
  console.log(searchdata)
  return (searchdata.map((data) =>
    <div className='search-result-div' key={data._id}>
      <Card>
        <Card.Header>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {data.category}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
  <Card.Title>NRs.{data.amount} spent on {data.incurred_on.split('T')[0]}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {data.notes}-{data.author.name}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  )
  )
}

export default Expdatasearch
