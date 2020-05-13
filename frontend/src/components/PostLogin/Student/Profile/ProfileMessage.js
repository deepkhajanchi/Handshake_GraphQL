import React, { useState } from 'react';
import Axios from 'axios';
//
import { storedUserInfo } from '../../../../utility';
import { Link } from 'react-router-dom';
import { Form, Modal, Button } from 'react-bootstrap';

function ProfileMessage(props) {
  const [messageResp, setMessageResp] = useState({show: false, body: 'Loading'});
  const handleClose = () => setMessageResp({show: false, body: 'Loading'});
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = {
      senderId: storedUserInfo().profile._id,
      senderType: `${storedUserInfo().type}Profile`,
      receiverId: props.studentProfile._id,
      receiverType: 'StudentProfile',
      message: form.message.value
    }
    Axios.post(`http://localhost:3001/messages/startConversation`,formData).then(resp => {
      if(resp.status === 200 && resp.data.success){
        let body = <Link to='/messages'><Button variant='primary'>Go to chat window</Button></Link>
        setMessageResp({show: true, body: body});
      }
    });
  }
  const handleShow = () => {
    if(messageResp.body === 'Loading'){
      let data = {
        initiator: storedUserInfo().profile._id,
        receiver: props.studentProfile._id
      };
      let body = null;
      Axios.post(`http://localhost:3001/messages/converstion_window`,data).then(resp => {
        if(resp.status === 200 && resp.data.window){
          body = <Link to='/messages'><Button variant='primary'>Go to chat window</Button></Link>
        }else{
          body = <Form onSubmit={handleSubmit}>
            <Form.Control as='textarea' name='message' placeholder='Send a message' required></Form.Control>
            <Button type='submit'>Submit</Button>
          </Form>
        }
        setMessageResp({show: true, body: body});
      })
    }
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Message
      </Button>

      <Modal show={messageResp.show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Message {props.studentProfile.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageResp.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileMessage;