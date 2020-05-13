import React from 'react';
import { Col, Row, Jumbotron } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { storedUserInfo } from '../../../../utility';

function MessageHistory(props) {
  let messageWindow = props.messageWindow;
  let respondentId = messageWindow.respondent._id;
  let myId = storedUserInfo().profile._id;
  let senderAvatar = <Avatar name={messageWindow.responderName} src={messageWindow.responderImagePath} size={30} round="50px"/>
  let myAvatar = <Avatar name={messageWindow.myName} src={messageWindow.myImagePath} size={30} round="50px"/>
  let messagesTag = props.messageWindow.messages.map(message => {
    return (
      <Row>
        <Col xs={2}>
          {message.creatorId === respondentId ? senderAvatar : null}
        </Col>
        <Col>
          <Jumbotron className='pl-3 pr-3 pt-3 pb-3'>
            <p className='font-weight-normal'>{message.message}</p>
            <p className='mb-0 text-right font-weight-lighter font-italic'>{new Date(message.createdAt).toLocaleString()}</p>
          </Jumbotron>
        </Col>
        <Col xs={2}>
         {message.creatorId === myId ? myAvatar : null}
        </Col>
      </Row>
    );
  })
  return messagesTag;
}

export default MessageHistory;