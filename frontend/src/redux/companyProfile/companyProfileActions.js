import React from 'react';
import {Alert} from 'react-bootstrap';
import {
  COMPANY_PROFILE_DATA,
  COMPANY_PROFILE_ERROR,
  UPDATE_COMPANY_PROFILE_SUCCESS,
  UPDATE_COMPANY_PROFILE_ERROR,
} from '../action-types';
import axios from 'axios';
//

export const getCompanyProfile = (id) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.get(`http://localhost:3001/company_profile/${id}`, {
    validateStatus: false,
  }).then((resp) => {
    if (resp.status === 200) {
      dispatch({
        type: COMPANY_PROFILE_DATA,
        payload: resp.data
      })
    } else {
      dispatch({
        type: COMPANY_PROFILE_ERROR
      });
    }
  });
};

export const updateCompanyProfile = (companyProfileId,formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.post(`http://localhost:3001/company_profile/${companyProfileId}`, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        dispatch({
          type: UPDATE_COMPANY_PROFILE_SUCCESS
        });
      } else {
        dispatch({
          type: UPDATE_COMPANY_PROFILE_ERROR,
          payload: <Alert variant="danger">Updated</Alert>
        });
      }
    });
};