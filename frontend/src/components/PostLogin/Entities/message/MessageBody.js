import React, { useState } from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import MessageHistory from './MessageHistory';
import MessageSend from './MessageSend';

function MessageBody(props) {
  let [messageWindow,setMessageWindow] = useState(props.messageWindow);
  return (
  <Tab.Pane eventKey={props.messageWindow._id}>
    <Row><Col><h3 className='text-capitalize'>{messageWindow.responderName}</h3></Col></Row>
    <div className='h-divider'/>
    <Row><Col><MessageHistory messageWindow={messageWindow}/></Col></Row>
    <div className='h-divider'/>
    <Row><Col><MessageSend messageWindow={messageWindow} setMessageWindow={setMessageWindow}/></Col></Row>
  </Tab.Pane>
  );
}

export default MessageBody;