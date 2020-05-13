import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import JobPostingSummary from '../../Student/Jobs/JobPostingSummary';
import { storedUserInfo } from '../../../../utility';
import Paginate from '../../Entities/Pagination';
//import {getCompanyJobPostings} from './../../../../redux/companyJob/companyJobActions'
//import { connect } from 'react-redux';

import { graphql } from 'react-apollo';
import {joppostingmutation} from '../../mutations/mutations';

function CompanyJobPostings(props) {
  let perPage = 3;
  const companyProfileId = storedUserInfo().profile._id;
  let jobPostingResp = props.jobPostingResp;
  if (jobPostingResp.status === 'loading') {
    console.dir(props);
    let params = {
      companyProfile: companyProfileId,
      page: jobPostingResp.currentPage,
      perPage: perPage
    }
    props.getCompanyJobPostings(params)
  }
  const handlePrevPage = () =>{
    if(jobPostingResp.currentPage === 1){
      return
    }
    props.getCompanyJobPostings({
      companyProfile: companyProfileId,
      page: jobPostingResp.currentPage - 1,
      perPage: perPage
    })
  }

  const handleNextPage = () =>{
    if(jobPostingResp.currentPage === jobPostingResp.totalPages){
      return
    }
    props.getCompanyJobPostings({
      companyProfile: companyProfileId,
      page: jobPostingResp.currentPage + 1,
      perPage: perPage
    })
  }

  if (jobPostingResp.status === 'loading') {
    return <h3>Loading Available Jobs...</h3>;
  } if (jobPostingResp.status === 'recordNotFound') {
    return <h3>Something went wrong..</h3>;
  }
  const { jobPostings } = jobPostingResp;
  console.dir(jobPostings);
  let jobPostingsDivs = jobPostings.data.map((jobPosting) => {
    let jobApplicationTag = (
      <Button style={{ float: 'right' }} variant="link" href={`/${companyProfileId}/job_postings/${jobPosting._id}/job_applications`}>
        Job applications
      </Button>
    );
    return (
      <div>
        <JobPostingSummary jobPosting={jobPosting} linkJobTitle jobApplications={jobApplicationTag} />
      </div>
    );
  });
  jobPostingsDivs = jobPostingsDivs.length > 0 ? jobPostingsDivs : <h2>No Jobs Posted</h2>;
  return (
    <div className="clearfix new-topbar-nux style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
      <br />
      <Button style={{ float: 'right' }} variant="primary" href={`/company/${companyProfileId}/create/job_postings`}>Create New Job</Button>
      <br />
      <br />
      {jobPostingsDivs}
      <Paginate handlePrevPage={handlePrevPage} currentPage={jobPostingResp.currentPage} totalPages={jobPostingResp.totalPages} handleNextPage={handleNextPage}/>
    </div>
  );
}
export default graphql(joppostingmutation,{
  name: "jobpostingmutation"
})(CompanyJobPostings);
