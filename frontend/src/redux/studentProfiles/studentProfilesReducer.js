import {
  STUDENT_PROFILES_LOADING,
  STUDENT_PROFILES_DATA,
  STUDENT_PROFILES_ERROR
} from '../action-types';

const initalState = {
  studentProfilesData: {
    students: [],
    totalPages: null,
    currentPage: 1,
    queryParams: {}
  },
  error: null,
  status: null
}

export function studentProfilesReducer(state=initalState,action){
  switch(action.type){
    case STUDENT_PROFILES_LOADING:
      return {
        ...state,
        error: null,
        status: 'loading'
      }
    case STUDENT_PROFILES_DATA:
      return {
        ...state,
        studentProfilesData: action.payload,
        status: 'loaded'
      }
    case STUDENT_PROFILES_ERROR:
      return {
        ...state,
        error: action.payload,
        status: 'error'
      }
    default: return state
  }
}