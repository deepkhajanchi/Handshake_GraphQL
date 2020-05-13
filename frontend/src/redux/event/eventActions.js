import {
  EVENT_DETAILS_DATA,
  EVENT_DETAILS_ERROR,
  EVENT_SEARCH_DETAILS_ERROR,
  EVENT_SEARCH_DETAILS_DATA,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  EVENT_REGISTERED_STUDENTS
} from './../action-types'
import axios from 'axios';
//
import { storedUserInfo } from '../../utility';

export const getEventDetails = (eventId) => dispatch =>{
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.get(`http://localhost:3001/events/show/${eventId}`, {
    validateStatus: false,
  }).then((resp) => {
    if (resp.status === 200) {
      dispatch({ 
        type: EVENT_DETAILS_DATA, 
        payload: resp.data 
      });
    } else {
      dispatch({
        type: EVENT_DETAILS_ERROR,
      })
    }
  });
}

export const searchEvents = (userType,queryData) => dispatch =>{
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.get(`http://localhost:3001/events/${userType.toLowerCase()}/${storedUserInfo().profile._id}`, { params: queryData }, { validateStatus: false }).then((resp) => resp.data).then((resp) => {
    if (resp.error) {
      dispatch({
        type: EVENT_SEARCH_DETAILS_ERROR
      });
    }
    dispatch({ 
      type: EVENT_SEARCH_DETAILS_DATA, 
      payload: {
        events: resp.events, 
        major: resp.studentMajor,
        totalPages: Math.ceil(resp.totalRecordCount / (queryData.perPage || 10)),
        currentPage: queryData.page || 1,
        queryParams: queryData,
        userType: userType
      }
    });
  });
}

export const createEvent = (formData) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.post(`http://localhost:3001/events`, formData, { validateStatus: false }).then((resp) => {
    if (resp.status == 200 & resp.data.success) {
      dispatch({
        type: CREATE_EVENT_SUCCESS
      })
    } else {
      dispatch({
        type: CREATE_EVENT_ERROR,
        payload: resp.data.error
      })
    }
  });
}

export const registeredStudentsForEvents = (eventId) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.get(`http://localhost:3001/event_registrations?event=${eventId}`)
      .then((resp) => {
        dispatch({
          type: EVENT_REGISTERED_STUDENTS,
          payload: {eventRegistrations: resp.data.data || [] }
        });
      });
}