import React, { useState } from 'react';
import axios from 'axios';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import JobPostingSummary from './JobPostingSummary';
import Paginate from '../../Entities/Pagination';
import {getStudentJobs} from './../../../../redux/studentJobs/studentJobsAction'
import { connect } from 'react-redux';


function JobPostingsAll(props) {
  let perPage = 5;
  const { companyProfileId } = props;
  const jobPostingResp = props.jobPostingResp;
  if (jobPostingResp.status === 'loading') {
    console.dir(props);
    let params = {
      page: 1,
      perPage: perPage,
      companyProfile: companyProfileId 
    }
    props.getStudentJobs(params)
  }



  const handleOnChange = (e,page=1,formElement=null) => {
    const form = formElement || e.currentTarget.form;
    const queryData = {
      page: 1,
      perPage: perPage,
      jobTitle: form.jobTitle.value,
      jobCategory: form.jobCategory.value,
      location: form.location.value,
      companyProfile: companyProfileId,
      sort: eval(`(${form.sort.value})`)
    };
    props.getStudentJobs(queryData);
    
  };

  const handlePrevPage = () =>{
    if(jobPostingResp.queryData.page === 1){
      return
    }
    jobPostingResp.queryData.page--;
    props.getStudentJobs(jobPostingResp.queryData);
  }

  const handleNextPage = () =>{
    if(jobPostingResp.currentPage === jobPostingResp.totalPages){
      return
    }
    jobPostingResp.queryData.page++;
    props.getStudentJobs(jobPostingResp.queryData);
  }

  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };

  if (jobPostingResp.status === 'loading' || jobPostingResp.status === 'reloading') {
    return <h3>Loading available Jobs...</h3>;
  } if (jobPostingResp.status === 'recordNotFound') {
    return <h3>Still Loading...</h3>;
  }


  const { jobPostings } = jobPostingResp;
  console.dir(jobPostings);
  const jobPostingsDivs = jobPostings.data.map((jobPosting) => (
    <Row className="my-3">
      <Col>
        <JobPostingSummary jobPosting={jobPosting} linkJobTitle />
      </Col>
    </Row>
  ));

  return (
    <div>
      <br />
      <Row>
        <Col xs={3}>
          <Row className="my-3">
            <Col>
              <Card>
                <Form id='jobPostingForm'>
                  <Card.Body>
                    <Card.Title>
                      Filters
                      <Button style={{ float: 'right' }} variant="secondary" onClick={resetForm}>Reset</Button>
                    </Card.Title>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Title</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="jobTitle" onChange={handleOnChange} placeholder="Job Title" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item" style={{width: '100%'}}>
                    <Card.Text>Category</Card.Text>
                    <Card.Text>
                      <Form.Control as="select" name="jobCategory" onChange={handleOnChange} placeholder="Full Time, Part Time" style={{width: '100%'}}>
                      <option key='' value=''>All</option>
                        <option key='Full Time' value='Full Time'>Full Time</option>
                        <option key='Part Time' value='Part Time'>Part Time</option>
                        <option key='Internship' value='Internship'>Internship</option>
                      </Form.Control>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Location</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="location" onChange={handleOnChange} placeholder="Job Location" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item" style={{width: '100%'}}>
                    <Card.Text>Sort</Card.Text>
                    <Card.Text>
                      <Form.Control as="select" name="sort" onChange={handleOnChange} placeholder="sort order" style={{width: '100%'}}>
                        Location/ Deadline/ PostingDate
                        <option key='' value='{}'>Clear</option>
                        <option data='location' key='location' value='{location: "asc"}'>Location- Ascending</option>
                        <option key='location' value='{location: "desc"}'>Location- Descending</option>
                        <option key='applicationDeadline' value='{applicationDeadline: "asc"}'>Deadline- Ascending</option>
                        <option key='applicationDeadline' value='{applicationDeadline: "desc"}'>Deadline- Descending</option>
                        <option key='postingDate' value='{postingDate: "asc"}'>Posting Date- Ascending</option>
                        <option key='postingDate' value='{postingDate: "desc"}'>Posting Date- Descending</option>
                      </Form.Control>
                    </Card.Text>
                  </Card.Body>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          {jobPostingsDivs}
          <Paginate handlePrevPage={handlePrevPage} currentPage={jobPostingResp.queryData.page} totalPages={jobPostingResp.totalPages} handleNextPage={handleNextPage}/>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  jobPostingResp: state.studentJobs.jobs
})
export default connect(mapStateToProps,{getStudentJobs})(JobPostingsAll);
