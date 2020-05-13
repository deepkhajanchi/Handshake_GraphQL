import {
  JOB_POSTING_SHOW,
  JOB_POSTING_APPLY,
  JOB_POSTING_STATUS,
} from '../action-types';

let initialState = {
  show:{
    status: 'loading', 
    jobPosting: null
  },
  jobStatus:null,
  error: null
}

export function jobPostingReducer(state=initialState,action){
  switch(action.type){
    case JOB_POSTING_SHOW:
      return {
        ...state,
        show: action.payload
      }
    case JOB_POSTING_STATUS:
      return{
        ...state,
        jobStatus: action.payload,
        error: null
      }
    case JOB_POSTING_APPLY:
      return{
        ...state,
        jobStatus: action.payload.status,
        error: action.payload.error,
      }
    default: return state
  }
}