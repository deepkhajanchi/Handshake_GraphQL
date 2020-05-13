import React, { useState } from 'react';
import axios from 'axios';
import '../../../../Styles/jobposting.css';
import { useParams } from 'react-router-dom';
import {
  Row, Col, Card, Container,
} from 'react-bootstrap';
import JobPostingSummary from './JobPostingSummary';
//
import ApplyForJobButton from './ApplyForJobButton';
import {getJobPosting} from './../../../../redux/jobPosting/jobPostingActions'
import { connect } from 'react-redux';

function JobPostingShow(props) {
  const { id: jobPostingId } = useParams();
  const jobPostingResp = props.jobPostingResp;
  if (jobPostingResp.status === 'loading') {
    props.getJobPosting(jobPostingId);
  }
  if (jobPostingResp.status === 'loading') {
    return <h3>Job Details...</h3>;
  } if (jobPostingResp.status === 'recordNotFound') {
    return <h3>Details Does Not Exist</h3>;
  }

  const { jobPosting } = jobPostingResp;
  return (
    <Container>
      <Row className="m-3">
        <Col>
          <JobPostingSummary jobPosting={jobPosting} />
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                <span style={{ float: 'left' }}>
                  Applications close on
                  {jobPosting.readableDeadline}
                </span>
                <span style={{ float: 'right' }}><ApplyForJobButton jobPostingId={jobPostingId} /></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Job Description</Card.Title>
              <Card.Text>{jobPosting.jobDescription}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

const mapStateToProps = (state) => ({
  jobPostingResp: state.jobPosting.show
})
export default connect(mapStateToProps,{getJobPosting})(JobPostingShow);
