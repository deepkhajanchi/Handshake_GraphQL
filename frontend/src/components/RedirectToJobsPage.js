import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToJobsPage = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if (userInfo) {
    return <Redirect to={`/${userInfo.type}/job_postings`} />;
  }
  return null;
};

export default RedirectToJobsPage;
