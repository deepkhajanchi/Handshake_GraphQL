import {
  SUCCESS_LOG_IN_RESPONSE,
  ERROR_LOG_IN_RESPONSE,
  LOG_OUT
} from '../action-types';
import axios from 'axios';
//
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const userLogin = (formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.post(`http://localhost:3001/users/login`, formData)
  .then((response) => {
    console.log('Status Code : ', response.status);
    if (response.status === 200) {
      if (response.data.success === true) {
        var decodedUserInfo = JSON.stringify(jwt_decode(response.data.jwtToken));
        sessionStorage.setItem('token', "JWT "+response.data.jwtToken);
        sessionStorage.setItem('userInfo', decodedUserInfo);
        dispatch({
          type: SUCCESS_LOG_IN_RESPONSE,
          payload: decodedUserInfo
        });
      } else {
        dispatch({
          type: ERROR_LOG_IN_RESPONSE,
          payload: response.data.error
        })
      }
    }
  });
}

export const userLogout = () => dispatch => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userInfo');
  dispatch({
    type: LOG_OUT,
  })
}

export const userSignUp = (formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.post(`http://localhost:3001/users/register`, formData)
  .then((response) => {
    console.log('Status Code : ', response.status);
    if (response.status === 200) {
      if (response.data.success === true) {
        var decodedUserInfo = JSON.stringify(jwt_decode(response.data.jwtToken));
        sessionStorage.setItem('token', "JWT "+response.data.jwtToken);
        sessionStorage.setItem('userInfo', decodedUserInfo);
        dispatch({
          type: SUCCESS_LOG_IN_RESPONSE,
          payload: response.data.userInfo
        });
      } else {
        dispatch({
          type: ERROR_LOG_IN_RESPONSE,
          payload: response.data.error
        })
      }
    }
  });
}