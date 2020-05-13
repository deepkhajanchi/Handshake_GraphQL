import {
  STUDENT_JOB_APPLICATIONS,
} from '../action-types';
import axios from 'axios';
//
import { storedUserInfo } from '../../utility';

export const getStudentJobApplications = (queryParams) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.get(`http://localhost:3001/job_application/student_applications/${storedUserInfo().profile._id}`, { params: queryParams }, { validateStatus: false })
  .then((resp) => {
    if (resp.status === 200 && resp.data.data) {
      dispatch({
        type: STUDENT_JOB_APPLICATIONS,
        payload: {
          status: 'loaded', 
          applications: resp.data.data, 
          queryParams: queryParams,
          totalPages: Math.ceil(resp.data.totalRecords / queryParams.perPage)
        }
      });
    } else {
      return dispatch({
        type: STUDENT_JOB_APPLICATIONS,
        payload: { 
          status: 'error', 
          applications: null, 
          queryParams: queryParams 
        }
      });
    }
  });
};