import {
  ALL_JOB_APPLICATIONS,
  COMAPANY_JOB_POSTINGS,
  CHANGE_JOB_APPLICATION_STATUS,
  JOB_POSTING_CREATE
} from '../action-types';
import axios from 'axios';
//

export const getAllJobApplications = (jobPostingId) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.get(`http://localhost:3001/job_application?jobPostingId=${jobPostingId}`)
  .then((resp) => {
    dispatch({
      type: ALL_JOB_APPLICATIONS,
      payload: resp.data.data
    })
  });
};

export const getCompanyJobPostings = (params) => dispatch => {
  let perPage = 3;
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.get(`http://localhost:3001/job_postings`, { params: params }, {
    validateStatus: false,
  }).then((resp) => {
    if (resp.status === 200) {
      dispatch({ 
        type: COMAPANY_JOB_POSTINGS,
        payload: {
          status: 'recordFound', 
          jobPostings: resp.data,
          currentPage: params.page,
          totalPages: Math.ceil(resp.data.totalRecords / perPage),
        }
      });
    } else {
      dispatch({ 
        type: COMAPANY_JOB_POSTINGS,
        payload: {
          status: 'recordNotFound' 
        }
      });
    }
  });
}

export const changeJobApplicationStatus = (applicationId, formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.post(`http://localhost:3001/job_application/${applicationId}/set_status`, formData, { validateStatus: false })
    .then((resp) => {
      if (resp.status == 200 && resp.data.success) {
        dispatch({
          type: CHANGE_JOB_APPLICATION_STATUS,
          payload: {
            applicationId: applicationId,
            status: formData.status
          }
        })
      }
    });
}

export const createJobPostings = (companyProfileId,formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`http://localhost:3001/job_postings/${companyProfileId}/create`, formData, {
      validateStatus: false,
    }).then((resp) => {
      console.dir(resp);
      if (resp.status === 200 && resp.data.success) {
        dispatch({
          type: JOB_POSTING_CREATE,
          payload: {
            success: true
          }
        });
      } else {
        dispatch({
          type: JOB_POSTING_CREATE,
          payload: {
            success: false,
            error: resp.data.error
          }
        });
      }
    });
}