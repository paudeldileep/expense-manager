import React from "react"
import Card from "react-bootstrap/esm/Card"
import Button from "react-bootstrap/Button"

const Expdatasearch = ({ searchdata,removeexp }) => {
  //console.log(searchdata)
  return (searchdata.map((data) =>
    
      <Card className="search-result-div-card" key={data._id}>
        <Card.Header>
          
<Card.Title className="grey-text"><span className="title-imp">NRs.{data.amount}</span> spent for <span className="title-imp">{data.title}</span> {'('}{data.incurred_on.split('T')[0]}{')'}</Card.Title>
  
        </Card.Header>
        <Card.Body>
  
          <Card.Subtitle className='mb-2 text-muted plain-white-text'>
          {'['} {data.category} {']'} {data.notes}-{data.author.name} <span className="float-right"><Button className='bg-red' size="sm" onClick={()=>removeexp(data)}><i className='fa fa-trash color-white'></i> </Button></span>
          </Card.Subtitle>
          
        </Card.Body>
      </Card>
    
  )
  )
}

export default Expdatasearch
