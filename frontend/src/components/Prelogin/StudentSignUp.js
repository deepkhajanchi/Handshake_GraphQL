import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';
import { connect } from 'react-redux';
import { userSignUp } from '../../redux/entry/entryActions';

function StudentSignUp(props) {

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const form_data = {
      userData: {
        emailId: form.emailId.value,
        password: form.password.value,
        role: 'Student',
      },
      profileData: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        currentCollegeName: form.currentCollegeName.value,
      },
    };
    props.userSignUp(form_data);
  }
  let errorTag = null;
  if (props.user.error) {
    errorTag = <Alert variant="danger">{props.user.error}</Alert>;
  }
  return (
    <Container>
    <br/>
      <RedirectToJobsPage />
      <br />
      <br />
      <Row>
        <Col />
        <Col>
          <h2>Register as a Student</h2>
          <Form onSubmit={handleSubmit}>
            {errorTag}
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Id</Form.Label>
              <Form.Control name="emailId" required type="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" required type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>College Name</Form.Label>
              <Form.Control name="currentCollegeName" required />
            </Form.Group>
            <center><Button variant="primary" type="submit">Register</Button></center>
          </Form>
        </Col>
        <Col />
      </Row>
      <br />
      <br />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  userSignUp: userSignUp,
};

const ConnectedStudentSignUp = connect(mapStateToProps, mapDispatchToProps)(StudentSignUp);
export default ConnectedStudentSignUp;
