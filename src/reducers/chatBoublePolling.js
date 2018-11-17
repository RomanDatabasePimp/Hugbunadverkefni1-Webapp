import { POLL_SUCCESS,POLL_FAILURE,POLL_REQUEST } from '../actions/chatBoublePolling';

const initialState = {
 msg:null,
 chatroom:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POLL_SUCCESS:
      return {
        ...state,
        msg: action.msg,
        chatroom : action.chatroom
      };
    case POLL_REQUEST:
      return {
        ...state,
        msg: action.msg,
        chatroom : action.chatroom
    };
    case POLL_FAILURE:
      return {
        ...state,
        msg: action.msg,
        chatroom : action.chatroom
    };
    default:
      return state;
  }    
};