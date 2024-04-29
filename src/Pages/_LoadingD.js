import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import '../component/home.css'
function _LoadingD() {
  return (
    <div className='container-pas mt-2'>
     <Card style={{ width: '18rem' }} className='card-pas border-purple'>
     <Card.Header >Galuh Dental</Card.Header>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={5} /> <Placeholder xs={2} /> 
          </Placeholder>
          <Card.Footer>
           <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={5} /> <Placeholder xs={2} /> 
          </Placeholder>
        </Card.Footer>
        </Card.Body>
      </Card>

    </div>
  )
}

export default _LoadingD