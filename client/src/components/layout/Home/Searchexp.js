import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


const Searchexp = props => {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col xs={12} lg={6}>
                <Form>
  <Form.Row className="align-items-center">
    <Col xs="auto">
      
    <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>From</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="date"/>
      </InputGroup>
    </Col>
    <Col xs="auto">
      
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>To</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="date"/>
      </InputGroup>
    </Col>
    <Col xs="auto">
      <Button type="submit" className="mb-2">
        Search
      </Button>
    </Col>
  </Form.Row>
  </Form>
                </Col>
            </Row>
        </Container>
    )
}



export default Searchexp
