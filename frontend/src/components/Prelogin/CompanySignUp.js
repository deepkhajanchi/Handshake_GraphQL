import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';
import { connect } from 'react-redux';
import { userSignUp } from '../../redux/entry/entryActions';

function CompanySignUp(props) {

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const form_data = {
      userData: {
        emailId: form.emailId.value,
        password: form.password.value,
        role: 'Company',
      },
      profileData: {
        name: form.name.value,
        location: form.location.value,
      },
    };
    axios.defaults.withCredentials = true;
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
      <Row>
        <Col />
        <Col>
          <br />
          <br />
          <h2>Register as an Employer</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control name="name" required />
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
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" required />
            </Form.Group>
            <center><Button type="submit" variant="primary">Register</Button></center>
            {errorTag}
          </Form>
        </Col>
        <Col />
      </Row>
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
const ConnectedCompanySignUp = connect(mapStateToProps, mapDispatchToProps)(CompanySignUp);
export default ConnectedCompanySignUp;
