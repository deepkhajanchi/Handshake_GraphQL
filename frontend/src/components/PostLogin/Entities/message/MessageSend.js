import React, { useState } from 'react';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import Axios from 'axios';
import { storedUserInfo } from '../../../../utility';
import {connect} from 'react-redux';
import { sendMessage } from '../../../../redux/message/messageActions';

function MessageSend(props) {
  let messageWindow = Object.assign({},props.messageWindow);
  let [errorMsg,setErrorMsg] = useState(null);
  let handleSubmit = async (e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    let formData = {
      "windowId": messageWindow._id,
      "creatorId": storedUserInfo().profile._id,
      "message": form.message.value
    }
    await props.sendMessage(formData);
    form.reset();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="p-3">
        <Col xs={1}>
        </Col>
        <Col>
          {errorMsg}
          <Form.Control name='message' as='textarea' placeholder='Type a message...'></Form.Control>
        </Col>
        <Col xs={1}>
          <Button variant='primary' type='submit'>Send</Button>
        </Col>
      </Row>
    </Form>
  );
}

const mapStateToProps = (state,ownProps) =>{
  let messageWindow = state.message.allMessages.messageWindows.find(msgWindow =>{
    if(msgWindow._id === ownProps.messageWindow._id){
      return true;
    }
  });
  return {
    messageWindow: messageWindow
  }
}

export default connect(mapStateToProps,{sendMessage})(MessageSend);