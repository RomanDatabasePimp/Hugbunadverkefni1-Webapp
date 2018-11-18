import {
  CREATE_CHATROOM_REQUEST, CREATE_CHATROOM_SUCCESS, CREATE_CHATROOM_FAILURE,
} from '../actions/chatroomActions';
import { start } from 'repl';

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
    case CREATE_CHATROOM_REQUEST:
      return action;
    case CREATE_CHATROOM_SUCCESS:
    return action;
    case CREATE_CHATROOM_FAILURE:
      return action;
    default:
      return state;
  }
}