import {
  STUDENT_JOB_APPLICATIONS,
} from '../action-types';

let initialState = {
  jobApplictions:{
    status: 'loading', 
    applications: null, 
    queryParams: {
      page: 1,
      status: ''
    },
    totalPages: null
  }
}

export function studentJobApplicationsReducer(state=initialState,action){
  switch(action.type){
    case STUDENT_JOB_APPLICATIONS:
      return {
        ...state,
        jobApplictions: action.payload
      }
    default: return state
  }
}