import {
  SUCCESS_LOG_IN_RESPONSE,
  ERROR_LOG_IN_RESPONSE,
  LOG_OUT,
} from '../action-types';

let initialState = {
  userInfo : JSON.parse(sessionStorage.getItem('userInfo')),
  error : null
}

export function entryReducer(state=initialState,action){
  switch(action.type){
    case SUCCESS_LOG_IN_RESPONSE:
      return {
        ...state,
        userInfo: action.payload,
        error: null
      }
    case ERROR_LOG_IN_RESPONSE:
      return {
        ...state,
        error: action.payload
      }
    case LOG_OUT:
      return {
        ...state,
        userInfo: null,
        error: null
      }
    default: return state
  }
}