import {
  STUDENT_JOBS,
} from '../action-types';

let initialState = {
  jobs:{
    status: 'loading', 
    applications: null, 
    queryParams: {
      page: 1,
      status: ''
    },
    totalPages: null
  }
}

export function studentJobsReducer(state=initialState,action){
  switch(action.type){
    case STUDENT_JOBS:
      return {
        ...state,
        jobs: action.payload
      }
    default: return state
  }
}