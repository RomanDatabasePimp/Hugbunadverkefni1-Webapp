import { datarequest, noDataRequest } from '../api';
import { logoutUser } from './userActions';
// for the creation of chatrooms
export const CHATROOM_DELETE_RESET = 'CHATROOM_DELETE_RESET';
export const CHATROOM_DELETE_REQUEST = 'CHATROOM_DELETE_REQUEST';
export const CHATROOM_DELETE_SUCCESS = 'CHATROOM_DELETE_SUCCESS';
export const CHATROOM_DELETE_FAILURE = 'CHATROOM_DELETE_FAILURE';



// ---------- actions ---------

function deleteChatroomReset() {
  return {
    type: CHATROOM_DELETE_RESET,
    isFetching: false,
    error: null,
    actionSuccess: false,
  }
}

function deleteChatroomRequest() {
  return {
    type: CHATROOM_DELETE_REQUEST,
    isFetching: true,
    error: null,
    actionSuccess: false,
  }
}

function deleteChatroomError(error) {
  return {
    type: CHATROOM_DELETE_FAILURE,
    isFetching: false,
    error: error,
    actionSuccess: false,
  }
}

function deleteChatroomSuccess(chatroom) {
  return {
    type: CHATROOM_DELETE_SUCCESS,
    isFetching: false,
    error: null,
    actionSuccess: true,
  }
}

// ----- thunks ----------

export const deleteChatroom = (chatroomName) => {
  return async (dispatch) => {
    dispatch(deleteChatroomRequest());
    try{
      const { result, status } = await noDataRequest(`auth/chatroom/${chatroomName}/`, 'DELETE');
      console.log('delete', result, status);
      
      if(status == 204){
        return dispatch(deleteChatroomSuccess())
      }
      if(result.hasOwnProperty('error')){
        return dispatch(deleteChatroomError(result.error));
      }
      if(result.hasOwnProperty('message')) {
        if(result.message === "JWT Token is missing" || result.message === "JWT Token is incorrect") {
        console.log(result.message);
        return dispatch(logoutUser());
        }
      }
    } catch (e){
      return dispatch(deleteChatroomError(e));
    }
  }
}

export const resetChatroomDelete = () => {
  return async (dispatch) => {
    await dispatch(deleteChatroomReset());
  }
}