import { OPEN_CHAT, OPEN_REQUEST } from '../actions/opennewchat';

const initialState = {
  chatid: null,
  chatname: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CHAT:
      return {
        ...state,
        chatid: action.chatid,
        chatname: action.chatname,
      };
    case OPEN_REQUEST:
      return {
        ...state,
        chatid: action.chatid,
        chatname: action.chatname,
      };
    default:
      return state;
  }    
};