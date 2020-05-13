import {
  EVENT_DETAILS_DATA,
  EVENT_DETAILS_ERROR,
  EVENT_SEARCH_DETAILS_ERROR,
  EVENT_SEARCH_DETAILS_DATA,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  EVENT_REGISTERED_STUDENTS
} from '../action-types'

let intialState = {
  eventDetails : {
    data: null,
    error: null,
    status: 'loading'
  },
  eventSearchDetails: {
    data: {
      events: [],
      totalRecordCount: 0,
      currentPage: 1,
      queryParams: {},
      userType: null
    },
    error: null,
    status: 'loading'
  },
  createEvent:{
    success: false,
    error: null
  },
  registeredStudents:{
    data: [],
    status: 'loading'
  }
}

export function eventReducer(state=intialState,action){
  switch(action.type){
    case EVENT_DETAILS_DATA:
      return {
        ...state,
        eventDetails : {
          data: action.payload,
          error: null,
          status: 'loaded'
        }
      }
    case EVENT_DETAILS_ERROR:
      return {
        ...state,
        eventDetails: {
          data: null,
          error: 'RecordNotFound',
          status: 'error'
        }
      }
    case EVENT_SEARCH_DETAILS_ERROR:
      return {
        ...state,
        eventSearchDetails: {
          data: [],
          error: 'Error',
          status: 'error'
        }
      }
      case EVENT_SEARCH_DETAILS_DATA:
        return {
          ...state,
          eventSearchDetails: {
            data: action.payload,
            error: null,
            status: 'loaded'
          }
        }
      case CREATE_EVENT_SUCCESS:
        return {
          ...state,
          createEvent: {
            success: true,
            error: null
          }
        }
      case CREATE_EVENT_ERROR:
        return {
          ...state,
          createEvent: {
            success: false,
            error: action.payload
          }
        }
      case EVENT_REGISTERED_STUDENTS:
        return {
          ...state,
          registeredStudents: {
            data: action.payload,
            status: 'loaded'
          }
        }
    default: return state
  }
}