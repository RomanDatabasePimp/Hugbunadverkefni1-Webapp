import {
  CHATROOM_RESET,
  CREATE_CHATROOM_REQUEST,
  CREATE_CHATROOM_SUCCESS,
  CREATE_CHATROOM_FAILURE,
  GET_CHATROOM_REQUEST,
  GET_CHATROOM_SUCCESS,
  GET_CHATROOM_FAILURE,
  UPDATE_CHATROOM_REQUEST,
  UPDATE_CHATROOM_SUCCESS,
  UPDATE_CHATROOM_FAILURE,
} from '../actions/chatroom';

const initialState = {
  chatroomIsFetching: false,
  chatroomError: null,
  chatroom: null,
  getChatroomSuccess: false,
  updateChatroomSuccess: false,
  createChatroomSuccess: false,
}

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem('user') || 'null');

export default (state = initialState, action) => {
  switch (action.type) {
    case CHATROOM_RESET:
      return {
        ...state,
        chatroomIsFetching: action.chatroomIsFetching,
        chatroomError: action.chatroomError,
        chatroom: action.chatroom,
        getChatroomSuccess: action.getChatroomSuccess,
        updateChatroomSuccess: action.updateChatroomSuccess,
        createChatroomSuccess: action.createChatroomSuccess,
      };
      
    case GET_CHATROOM_REQUEST:
      return {
        ...state,
        chatroomIsFetching: action.chatroomIsFetching,
        chatroomError: action.chatroomError,
        chatroom: action.chatroom,
        getChatroomSuccess: action.getChatroomSuccess,
      };
    case GET_CHATROOM_SUCCESS:
    return {
      ...state,
      chatroomIsFetching: action.chatroomIsFetching,
      chatroomError: action.chatroomError,
      chatroom: action.chatroom,
      getChatroomSuccess: action.getChatroomSuccess,
    };
    case GET_CHATROOM_FAILURE:
    return {
      ...state,
      chatroomIsFetching: action.chatroomIsFetching,
      chatroomError: action.chatroomError,
      chatroom: action.chatroom,
      getChatroomSuccess: action.getChatroomSuccess,
    };
    
    case UPDATE_CHATROOM_REQUEST:
      return {
        ...state,
        chatroomIsFetching: action.chatroomIsFetching,
        chatroomError: action.chatroomError,
        chatroom: action.chatroom,
        updateChatroomSuccess: action.updateChatroomSuccess,
      };
    case UPDATE_CHATROOM_SUCCESS:
    return {
      ...state,
      chatroomIsFetching: action.chatroomIsFetching,
      chatroomError: action.chatroomError,
      chatroom: action.chatroom,
      updateChatroomSuccess: action.updateChatroomSuccess,
    };
    case UPDATE_CHATROOM_FAILURE:
    return {
      ...state,
      chatroomIsFetching: action.chatroomIsFetching,
      chatroomError: action.chatroomError,
      chatroom: action.chatroom,
      updateChatroomSuccess: action.updateChatroomSuccess,
    };

    case CREATE_CHATROOM_REQUEST:
      return {
        ...state,
        chatroomIsFetching: action.chatroomIsFetching,
        chatroomError: action.chatroomError,
        chatroom: action.chatroom,
        createChatroomSuccess: action.createChatroomSuccess,
      };
    case CREATE_CHATROOM_SUCCESS:
    return {
      ...state,
      chatroomIsFetching: action.chatroomIsFetching,
      chatroomError: action.chatroomError,
      chatroom: action.chatroom,
      createChatroomSuccess: action.createChatroomSuccess,
    };
    case CREATE_CHATROOM_FAILURE:
    return {
      ...state,
      chatroomIsFetching: action.chatroomIsFetching,
      chatroomError: action.chatroomError,
      chatroom: action.chatroom,
      createChatroomSuccess: action.createChatroomSuccess,
    };
    default:
      return state;
  }
}