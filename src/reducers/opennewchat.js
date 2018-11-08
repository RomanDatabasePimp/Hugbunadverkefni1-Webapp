import { OPEN_CHAT } from '../actions/opennewchat';

const initialState = {
  chatid: null,
  chatname: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CHAT:
      return {
        ...state,
        chatid: action.isFetching,
        chatname: action.isRegistrated,
      };
    default:
      return state;
  }    
};