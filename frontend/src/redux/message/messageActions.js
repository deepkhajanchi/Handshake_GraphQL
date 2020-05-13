import {
  MESSAGE_SHOW,
  MESSAGE_SEND
} from '../action-types';
import axios from 'axios';
//
import { storedUserInfo } from '../../utility';

export const showMessages = () => dispatch => {
  let userType = storedUserInfo().type.toLowerCase();
  let profile = storedUserInfo().profile;
  axios.get(`http://localhost:3001/messages/${userType}/${profile._id}`).then(resp =>{
    if(resp.status === 200 && resp.data.profile){
      dispatch({
        type: MESSAGE_SHOW,
        payload: {
          status: 'loaded',
          messageWindows: resp.data.profile.messageWindows
        }
      })
    }else{
      dispatch({
        type: MESSAGE_SHOW,
        payload: {
          status: 'error',
          messageWindows: []
        }
      })
    }
  });
};

export const sendMessage = (formData) => dispatch => {
  axios.post(`http://localhost:3001/messages/send_message`, formData).then(resp =>{
    if(resp.status === 200 && resp.data.messages){
      dispatch({
        type: MESSAGE_SEND,
        payload: {
          messageWindowId: formData.windowId,
          messages: resp.data.messages
        }
      });
    }
  })
};