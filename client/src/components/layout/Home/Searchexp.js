import React from "react"
import Col from "react-bootstrap/esm/Col"

import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

const Searchexp = ({onFormSubmit,onDataChange,data}) => {
  
  return (
   
        <Form onSubmit={onFormSubmit}>
          <Form.Row className='align-items-center justify-content-center' >
            <Col xs='auto'>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>From</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type='date' name="startdate" onChange={onDataChange} value={data.startdate}/>
              </InputGroup>
            </Col>
            <Col xs='auto'>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>To</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type='date' name="enddate" onChange={onDataChange} value={data.enddate}/>
              </InputGroup>
            </Col>
            <Col xs='auto'>
              <Button type='submit' className='mb-2'>
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
        
  )
}

export default Searchexp
