import { GETNEWCHAT_ALERT } from '../actions/opennewchat';

const initialState = {
  chatid: null,
  chatname: null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GETNEWCHAT_ALERT:
        return {
          ...state,
          chatid: action.chatid,
          chatname: action.chatname
        };
      default:
        return state;
    }    
  };