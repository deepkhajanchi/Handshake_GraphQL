import {
  JOB_POSTING_SHOW,
  JOB_POSTING_APPLY,
  JOB_POSTING_STATUS,
} from '../action-types';
import axios from 'axios';
//
import { storedUserInfo } from '../../utility';

export const getJobPosting = (jobPostingId) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.get(`http://localhost:3001/job_postings/${jobPostingId}`, {
    validateStatus: false,
  }).then((resp) => {
    if (resp.status === 200) {
      dispatch({
        type: JOB_POSTING_SHOW,
        payload: { status: 'recordFound', jobPosting: resp.data }
      });
    } else {
      dispatch({
        type: JOB_POSTING_SHOW,
        payload: { status: 'recordNotFound' }
      });
    }
  });
};

export const getJobPostingAppliedStatus = (jobPostingId) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.post(`http://localhost:3001/job_application/status`, { studentProfileId: storedUserInfo().profile._id, jobPostingId: jobPostingId })
    .then((resp) => {
      dispatch({
        type: JOB_POSTING_STATUS,
        payload: resp.data.status
      })
    });
};

export const applyForJobPosting = (formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.post(`http://localhost:3001/job_application/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((resp) => {
    if (resp.status === 200 && resp.data.status) {
      dispatch({
        type: JOB_POSTING_APPLY,
        payload: {
          status: resp.data.status,
          error: null
        }
      })
    } else {
      dispatch({
        type: JOB_POSTING_APPLY,
        payload: {
          status: null,
          error: resp.data.error
        }
      })
    }
  });
};
