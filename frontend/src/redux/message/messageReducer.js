import {
  MESSAGE_SHOW,
  MESSAGE_SEND
} from '../action-types';

let initialState = {
  allMessages:{
    status: 'loading',
    messageWindows: []
  }
}

export function messageReducer(state=initialState,action){
  switch(action.type){
    case MESSAGE_SHOW:
      return {
        ...state,
        allMessages: action.payload
      }
    case MESSAGE_SEND:
      let messageWindows = Object.assign([],state.allMessages.messageWindows);
      let messageWindow = messageWindows.find(msgWindow => {
        if(msgWindow._id === action.payload.messageWindowId){
          return true;
        }
      })
      messageWindow.messages = action.payload.messages;
      return {
        ...state,
        allMessages: {
          status: 'loaded',
          messageWindows: messageWindows
        }
      }
    default: return state
  }
}