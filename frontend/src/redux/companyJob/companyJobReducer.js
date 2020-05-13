import {
  ALL_JOB_APPLICATIONS,
  COMAPANY_JOB_POSTINGS,
  CHANGE_JOB_APPLICATION_STATUS,
  JOB_POSTING_CREATE
} from '../action-types';

let initialState = {
  allJobApplictions: {
    status: 'loading',
    jobApplications: null
  },
  companyJobPostings: { 
    status: 'loading', 
    jobPostings: null,
    currentPage: 1,
    totalPages: null
  },
  createJob: {
    success: null,
    error: null
  }
}

export function companyJobReducer(state=initialState,action){
  switch(action.type){
    case ALL_JOB_APPLICATIONS:
      return {
        ...state,
        allJobApplictions: {
          status: 'loaded',
          jobApplications: action.payload
        }
      }
    case COMAPANY_JOB_POSTINGS:
      return {
        ...state,
        companyJobPostings: action.payload
      }
      case CHANGE_JOB_APPLICATION_STATUS:
        let jobApplications = Object.assign([],state.allJobApplictions.jobApplications);
        let jobApplication = jobApplications.find(ja => {
          if(ja._id === action.payload.applicationId){
            return true;
          }
        })
        jobApplication.status = action.payload.status;
        return {
          ...state,
          allJobApplictions: {
            status: 'loaded',
            jobApplications : jobApplications
          }
        }
      case JOB_POSTING_CREATE:
        return {
          ...state,
          createJob: action.payload
        }
    default: return state
  }
}