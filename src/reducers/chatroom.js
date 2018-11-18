import {
  CREATE_CHATROOM_REQUEST, CREATE_CHATROOM_SUCCESS, CREATE_CHATROOM_FAILURE, CREATE_CHATROOM_RESET
} from '../actions/chatroom';

const initialState = {
  isFetching: false,
  error: null,
  chatroom: null,
  actionSuccess: false,
}

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem('user') || 'null');

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHATROOM_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        chatroom: action.chatroom,
        actionSuccess: action.actionSuccess,
      };
    case CREATE_CHATROOM_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        chatroom: action.chatroom,
        actionSuccess: action.actionSuccess,
      };
    case CREATE_CHATROOM_SUCCESS:
    return {
      ...state,
      isFetching: action.isFetching,
      error: action.error,
      chatroom: action.chatroom,
      actionSuccess: action.actionSuccess,
    };
    case CREATE_CHATROOM_FAILURE:
    return {
      ...state,
      isFetching: action.isFetching,
      error: action.error,
      chatroom: action.chatroom,
      actionSuccess: action.actionSuccess,
    };
    default:
      return state;
  }
}