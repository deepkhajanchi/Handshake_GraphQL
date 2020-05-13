import React, { useState } from 'react';
import axios from 'axios';
import {
  Card, Row, Col, Form,
} from 'react-bootstrap';
import { storedUserInfo } from '../../../../utility';
import Paginate from '../../Entities/Pagination';
import {getStudentJobApplications} from './../../../../redux/studentJobApplications/studentJobApplicationsActions'
import { connect } from 'react-redux';

function StudentJobApplications(props) {
  let perPage = 1;
  const applicationResp = props.applicationResp;
  if (applicationResp.status === 'loading') {
    applicationResp.queryParams.perPage = perPage;
    props.getStudentJobApplications(applicationResp.queryParams)
  }

  const handleOnChange = (e) => {
    const status = e.currentTarget.value;
    applicationResp.queryParams.status = status;
    applicationResp.queryParams.page = 1;
    props.getStudentJobApplications(applicationResp.queryParams)
  };
  const handlePrevPage = () =>{
    if(applicationResp.queryParams.page === 1){
      return
    }
    applicationResp.queryParams.page--;
    props.getStudentJobApplications(applicationResp.queryParams);
  }

  const handleNextPage = () =>{
    if(applicationResp.queryParams.page === applicationResp.totalPages){
      return
    }
    applicationResp.queryParams.page++;
    props.getStudentJobApplications(applicationResp.queryParams);
  }

  if (applicationResp.status === 'loading') {
    return <h3>Loading Applications..</h3>;
  }
  if (applicationResp.status === 'error') {
    return <h3>Something went wrong!</h3>;
  }
  const application_tag = applicationResp.applications.map((application) => (
    <Row className="my-3">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title><a href={`/job_postings/${application.jobPosting._id}`}>{application.jobPosting.jobTitle}</a></Card.Title>
            <Card.Text>
              Status:
              {application.status}
            </Card.Text>
            <Card.Text>
              Applied:
              {new Date(application.createdAt).toLocaleString('en-US', { dateStyle: 'full' })}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));
  return (
    <Row>
      <Col xs={3}>
        <Row className="my-3">
          <Col>
            <Form>
              <Card.Body class="list-group-item">
                <Card.Text>Status</Card.Text>
                <Card.Text>
                  <Form.Control as="select" name="Status" placeholder="selectStatus" onChange={handleOnChange} className="mr-sm-2" style={{ width: '100%' }} defaultValue={(applicationResp.queryParams || {}).status}>
                    <option key="" value="">All</option>
                    <option key="Pending" value="Pending">Pending</option>
                    <option key="Reviewed" value="Reviewed">Reviewed</option>
                    <option key="Declined" value="Declined">Declined</option>
                  </Form.Control>
                </Card.Text>
              </Card.Body>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col>
        {application_tag}
        <Paginate handlePrevPage={handlePrevPage} currentPage={applicationResp.queryParams.page} totalPages={applicationResp.totalPages} handleNextPage={handleNextPage}/>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  applicationResp: state.studentJobApplications.jobApplictions
})
export default connect(mapStateToProps,{getStudentJobApplications})(StudentJobApplications);
