import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import {loginMutation} from '../../mutations/mutations';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
//
import RedirectToProfile from '../RedirectToJobsPage';

function SignIn(props) {

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    const mutationResponse= await this.props.loginMutation( {
     variables:{
      emailId: form.emailId.value,
      password: form.password.value,
    }
  });
    props.loggedIn(loginMutation);
  }
  let errTag = null;
  if (props.user.error) {
    errTag = <Alert variant="danger">{props.user.error}</Alert>;
  }
  return (
    <div className="user-signin div-center-align">
      <RedirectToProfile />
      <br />
      <Container>
        <Row>
          <Col />
          <Col>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
              {errTag}
              <Form.Group>
                <Form.Label>Email Id</Form.Label>
                <Form.Control name="emailId" type="email" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}

export default graphql(loginMutation,{
  name: "loginMutation"
})(SignIn);
