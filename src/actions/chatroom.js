import { datarequest, noDataRequest } from '../api';

// for the creation of chatrooms
export const CHATROOM_RESET = 'CHATROOM_RESET';
export const CREATE_CHATROOM_REQUEST = 'CREATE_CHATROOM_REQUEST';
export const CREATE_CHATROOM_SUCCESS = 'CREATE_CHATROOM_SUCCESS';
export const CREATE_CHATROOM_FAILURE = 'CREATE_CHATROOM_FAILIURE';
export const GET_CHATROOM_REQUEST = 'GET_CHATROOM_REQUEST';
export const GET_CHATROOM_SUCCESS = 'GET_CHATROOM_SUCCESS';
export const GET_CHATROOM_FAILURE = 'GET_CHATROOM_FAILIURE';
export const UPDATE_CHATROOM_REQUEST = 'UPDATE_CHATROOM_REQUEST';
export const UPDATE_CHATROOM_SUCCESS = 'UPDATE_CHATROOM_SUCCESS';
export const UPDATE_CHATROOM_FAILURE = 'UPDATE_CHATROOM_FAILIURE';



// ---------- actions ---------

function chatroomReset() {
  return {
    type: CHATROOM_RESET,
    isFetching: false,
    error: null,
    chatroom: null,
    getChatroomSuccess: false,
    updateChatroomSuccess: false,
    createChatroomSuccess: false,
  }
}

function getChatroomRequest() {
  return {
    type: GET_CHATROOM_REQUEST,
    isFetching: true,
    error: null,
    chatroom: null,
    getChatroomSuccess: false,
  }
}

function getChatroomError(error) {
  return {
    type: GET_CHATROOM_FAILURE,
    isFetching: false,
    error: error,
    chatroom: null,
    getChatroomSuccess: false,
  }
}

function getChatroomSuccess(chatroom) {
  return {
    type: GET_CHATROOM_SUCCESS,
    isFetching: false,
    error: null,
    chatroom: chatroom,
    getChatroomSuccess: true,
  }
}

function createChatroomRequest() {
  return {
    type: CREATE_CHATROOM_REQUEST,
    isFetching: true,
    error: null,
    chatroom: null,
    createChatroomSuccess: false,
  }
}

function createChatroomError(error) {
  return {
    type: CREATE_CHATROOM_FAILURE,
    isFetching: false,
    error: error,
    chatroom: null,
    createChatroomSuccess: false,
  }
}

function createChatroomSuccess(chatroom) {
  return {
    type: CREATE_CHATROOM_SUCCESS,
    isFetching: false,
    error: null,
    chatroom: chatroom,
    createChatroomSuccess: true,
  }
}

function updateChatroomRequest() {
  return {
    type: UPDATE_CHATROOM_REQUEST,
    isFetching: true,
    error: null,
    chatroom: null,
    updateChatroomSuccess: false,
  }
}

function updateChatroomError(error) {
  return {
    type: UPDATE_CHATROOM_FAILURE,
    isFetching: false,
    error: error,
    chatroom: null,
    updateChatroomSuccess: false,
  }
}

function updateChatroomSuccess(chatroom) {
  return {
    type: UPDATE_CHATROOM_SUCCESS,
    isFetching: false,
    error: null,
    chatroom: chatroom,
    updateChatroomSuccess: true,
  }
}

// ----- thunks ----------

export const getChatroom = (chatroomName) => {
  return async (dispatch) => {
    dispatch(getChatroomRequest());
    try{
      const { result, status } = await noDataRequest(`auth/chatroom/${chatroomName}/`, 'GET');
      console.log('get', result, status);
      if(result.hasOwnProperty('error')){
        return dispatch(getChatroomError(result.error));
      }
      return dispatch(getChatroomSuccess(result))
    } catch (e){
      return dispatch(getChatroomError(e));
    }
  }
}

export const createChatroom = (data) => {
  return async (dispatch) => {
    dispatch(createChatroomRequest());
    try{
      const { result, status } = await datarequest('auth/chatroom/', data, 'POST');

      if(result.hasOwnProperty('error')){
        return dispatch(createChatroomError(result.error));
      }
      
      return dispatch(createChatroomSuccess(result))
    } catch (e){
      return dispatch(createChatroomError(e));
    }
  }
}

export const updateChatroom = (chatroomName, data) => {
  return async (dispatch) => {
    dispatch(updateChatroomRequest());
    try{
      const { result, status } = await datarequest(`auth/chatroom/${chatroomName}/`, data, 'PATCH');

      console.log(result, status);

      if(result.hasOwnProperty('error')){
        return dispatch(updateChatroomError(result.error));
      }
      
      return dispatch(updateChatroomSuccess(result))
    } catch (e){
      console.log(e);
      return dispatch(updateChatroomError(e));
    }
  }
}

export const resetChatroom = () => {
  return async (dispatch) => {
    await dispatch(chatroomReset());
  }
}