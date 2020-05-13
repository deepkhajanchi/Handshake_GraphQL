import {
  STUDENT_PROFILES_LOADING,
  STUDENT_PROFILES_DATA,
  STUDENT_PROFILES_ERROR
} from '../action-types';
import {storedUserInfo } from './../../utility';
import axios from 'axios';

export const getStudentProfiles = (queryData) => dispatch => {
  dispatch({
    type: STUDENT_PROFILES_LOADING
  });
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.get(`http://localhost:3001/student_profile`, { params: queryData }, { validateStatus: false }).then((resp) => {
    if (resp.status == 200 && resp.data.data) {
      const students = resp.data.data.filter((student) => student._id != storedUserInfo().profile._id);
      dispatch({
        type: STUDENT_PROFILES_DATA,
        payload: {
          students: students,
          totalPages: Math.ceil(resp.data.totalRecordCount / (queryData.perPage || 10)),
          currentPage: queryData.page || 1,
          queryParams: queryData
        }
      });
    } else {
      dispatch({ 
        type: STUDENT_PROFILES_ERROR
      });
    }
  });
}