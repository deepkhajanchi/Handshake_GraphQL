import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import {applyForJobPosting} from './../../../../redux/jobPosting/jobPostingActions'
import { connect } from 'react-redux';

function ApplyForJobForm(props) {
  const { studentProfileId, jobProfileId } = props;
  const submitStatus = props.submitStatus;
  const errorMsg = props.errorMsg;
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('jobPostingId', jobProfileId);
    formData.append('studentProfileId', studentProfileId);
    formData.append('resume', e.currentTarget.elements.resume.files[0]);
    props.applyForJobPosting(formData);
  };
  if (submitStatus == 'Pending') {
    return (
      <div>
        <Alert key="success" variant="success">
          Application submitted successfully!
        </Alert>
      </div>
    );
  }
  let errorTag = null;
  if (errorMsg) {
    errorTag = (
      <Alert key="danger" variant="danger">
        {errorMsg}
      </Alert>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            {errorTag}
            <h2>Apply for Job</h2>
            <Form.Group>
              <Form.Label>Upload your Resume</Form.Label>
              <Form.Control type="file" name="resume" required accept=".pdf" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  submitStatus: state.jobPosting.jobStatus,
  errorMsg: state.jobPosting.error
})
export default connect(mapStateToProps,{applyForJobPosting})(ApplyForJobForm);
