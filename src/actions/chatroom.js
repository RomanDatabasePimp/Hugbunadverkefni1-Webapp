import { datarequest } from '../api';

// for the creation of chatrooms
export const CREATE_CHATROOM_RESET = 'RESET_CHATROOM_REQUEST';
export const CREATE_CHATROOM_REQUEST = 'CREATE_CHATROOM_REQUEST';
export const CREATE_CHATROOM_SUCCESS = 'CREATE_CHATROOM_SUCCESS';
export const CREATE_CHATROOM_FAILURE = 'CREATE_CHATROOM_FAILIURE';



// ---------- actions ---------

function chatroomReset() {
  return {
    type: CREATE_CHATROOM_RESET,
    isFetching: false,
    error: null,
    chatroom: null,
    actionSuccess: false,
  }
}

function chatroomRequest() {
  return {
    type: CREATE_CHATROOM_REQUEST,
    isFetching: true,
    error: null,
    chatroom: null,
    actionSuccess: false,
  }
}

function chatroomError(error) {
  return {
    type: CREATE_CHATROOM_FAILURE,
    isFetching: false,
    error: error,
    chatroom: null,
    actionSuccess: false,
  }
}

function chatroomSuccess(chatroom) {
  return {
    type: CREATE_CHATROOM_SUCCESS,
    isFetching: false,
    error: null,
    chatroom: chatroom,
    actionSuccess: true,
  }
}

// ----- thunks ----------

export const createChatroom = (data) => {
  return async (dispatch) => {
    dispatch(chatroomRequest());
    try{
      const { result, status } = await datarequest('auth/chatroom/', data, 'POST');

      if(result.hasOwnProperty('error')){
        return dispatch(chatroomError(result.error));
      }
      
      return dispatch(chatroomSuccess(result))
    } catch (e){
      return dispatch(chatroomError(e));
    }
  }
}

export const resetChatroomForm = () => {
  return async (dispatch) => {
    await dispatch(chatroomReset());
  }
}