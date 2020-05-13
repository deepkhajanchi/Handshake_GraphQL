import {
  COMPANY_PROFILE_DATA,
  COMPANY_PROFILE_ERROR,
  UPDATE_COMPANY_PROFILE_SUCCESS,
  UPDATE_COMPANY_PROFILE_ERROR,
} from '../action-types';

let initialState = {
  getProfile: {
    status: 'loading',
    companyProfile: null
  },
  updateProfile: {
    errorMsg: null,
    success: false
  }
}

export function companyProfileReducer(state=initialState,action){
  switch(action.type){
    case COMPANY_PROFILE_DATA:
      return {
        ...state,
        getProfile: {
          status: 'loaded',
          companyProfile: action.payload
        }
      }
    case COMPANY_PROFILE_ERROR:
      return {
        ...state,
        getProfile: {
          status: 'recordNotFound',
          companyProfile: null
        }
      }
    case UPDATE_COMPANY_PROFILE_SUCCESS:
      return {
        ...state,
        getProfile: {
          status: 'loading',
          companyProfile: null
        },
        updateProfile:{
          errorMsg: null,
          success: true
        }
      }
    case UPDATE_COMPANY_PROFILE_ERROR:
      return {
        ...state,
        updateProfile:{
          errorMsg: action.payload,
          success: false
        }
      }
    default: return state
  }
}