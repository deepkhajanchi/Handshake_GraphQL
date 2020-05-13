import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Card, Col, Row, Button, Nav, Tab } from 'react-bootstrap';
import Axios from 'axios';
import { storedUserInfo } from '../../../../utility';
import MessageLink from './MessageLink';
import MessageBody from './MessageBody';
import {connect} from 'react-redux';
import { showMessages } from '../../../../redux/message/messageActions';

function ShowMessages(props) {
  let messageWindowResp = props.messageWindowResp;
  if(messageWindowResp.status === 'loading'){
    props.showMessages();
  }
  let messageWindowsTag = [];
  let messagesTag = [];
  if(messageWindowResp.status === 'loading'){
    messageWindowsTag = "Loading..."
  }else{
    messageWindowResp.messageWindows.forEach(messageWindow => {
      messageWindow.responderName = messageWindow.respondentType === 'CompanyProfile' ? messageWindow.respondent.name : `${messageWindow.respondent.firstName} ${messageWindow.respondent.lastName}`;
      messageWindow.myName = storedUserInfo().profile.name || `${storedUserInfo().profile.firstName} ${storedUserInfo().profile.lastName}`
      messageWindow.responderImagePath = `http://localhost:3001/images/profile_pics/${messageWindow.respondent.user}.png`;
      messageWindow.myImagePath = `http://localhost:3001/images/profile_pics/${storedUserInfo().id}.png`;
      messageWindowsTag.push(<MessageLink messageWindow={messageWindow}/>);
      messagesTag.push(<MessageBody messageWindow={messageWindow}/>);
    });
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="default">
            <Col xs='3' className='v-divider'>
              <Row>
                <Col><h3>Messages</h3></Col>
              </Row>
              <div className='h-divider'/>
              <Row>
                <Nav className="flex-column">
                  {messageWindowsTag}
                </Nav>
              </Row>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey='default'>
                  <div className='text-center'>No conversation selected</div>
                </Tab.Pane>
                {messagesTag}
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) =>({
  messageWindowResp: state.message.allMessages,
})

export default connect(mapStateToProps,{showMessages})(ShowMessages);