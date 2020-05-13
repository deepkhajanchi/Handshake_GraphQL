import React from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import Avatar from 'react-avatar';

function MessageLink(props) {
  let messageWindow = props.messageWindow;
  return (
    <Nav.Item>
      <Nav.Link eventKey={messageWindow._id} className='mx-0 px-0' variant="light">
        <Row>
          <Col xs={3} className='mr-0 pr-0'>
              <Avatar name={messageWindow.responderName} src={messageWindow.responderImagePath} size={20} round="50px"/>
          </Col>
          <Col xs={9} className='ml-0 pl-0'>
              <div className='text-capitalize text-truncate' style={{'max-width':'200px'}}>{messageWindow.responderName}</div>
              <div className='font-weight-lighter text-reset text-truncate' style={{'max-width':'200px'}}>{messageWindow.messages[messageWindow.messages.length -1].message}</div>
          </Col>
        </Row>
      </Nav.Link>
    </Nav.Item>
  );
}

export default MessageLink;