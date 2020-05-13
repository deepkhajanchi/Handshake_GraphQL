import {
  STUDENT_JOBS,
} from '../action-types';
import axios from 'axios';
//
import { storedUserInfo } from '../../utility';
import qs from 'qs';

export const getStudentJobs = (queryData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.get(`http://localhost:3001/job_postings`, { 
    params: queryData,
    paramsSerializer: qs.stringify
  }, { 
    validateStatus: false 
  }).then((resp) => {
    if (resp.status === 200) {
      dispatch({
        type: STUDENT_JOBS,
        payload: { 
          status: 'recordFound', 
          jobPostings: resp.data, 
          queryData: queryData,
          totalPages: Math.ceil(resp.data.totalRecords / queryData.perPage),
        }
      });
    } else {
      dispatch({ 
        type: STUDENT_JOBS,
        payload: {
          status: 'error', 
          jobPostings: null,
          queryData: queryData,
          totalPages: null
        }
      });
    }
  });
};