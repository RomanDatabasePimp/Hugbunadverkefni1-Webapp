import { datarequest, noDataRequest } from '../api';
import { logoutUser } from './userActions';
// for the creation of chatrooms
export const CHATROOM_LEAVE_RESET = 'CHATROOM_LEAVE_RESET';
export const CHATROOM_LEAVE_REQUEST = 'CHATROOM_LEAVE_REQUEST';
export const CHATROOM_LEAVE_SUCCESS = 'CHATROOM_LEAVE_SUCCESS';
export const CHATROOM_LEAVE_FAILURE = 'CHATROOM_LEAVE_FAILURE';



// ---------- actions ---------

function leaveChatroomReset() {
  return {
    type: CHATROOM_LEAVE_RESET,
    isFetching: false,
    error: null,
    actionSuccess: false,
  }
}

function leaveChatroomRequest() {
  return {
    type: CHATROOM_LEAVE_REQUEST,
    isFetching: true,
    error: null,
    actionSuccess: false,
  }
}

function leaveChatroomError(error) {
  return {
    type: CHATROOM_LEAVE_FAILURE,
    isFetching: false,
    error: error,
    actionSuccess: false,
  }
}

function leaveChatroomSuccess(chatroom) {
  return {
    type: CHATROOM_LEAVE_SUCCESS,
    isFetching: false,
    error: null,
    actionSuccess: true,
  }
}

// ----- thunks ----------

export const leaveChatroom = (chatroomName) => {
  return async (dispatch) => {
    dispatch(leaveChatroomRequest());
    try{
      const { result, status } = await noDataRequest(`auth/chatroom/${chatroomName}/leave/`, 'DELETE');
      console.log(result, status);
      if(status == 204){
        return dispatch(leaveChatroomSuccess())
      }
      if(result.hasOwnProperty('error')){
        return dispatch(leaveChatroomError(result.error));
      }
      if(result.hasOwnProperty('message')) {
        if(result.message === "JWT Token is missing" || result.message === "JWT Token is incorrect") {
        console.log(result.message);
        return dispatch(logoutUser());
        }
      }
    } catch (e){
      return dispatch(leaveChatroomError(e));
    }
  }
}

export const resetChatroomLeave = () => {
  return async (dispatch) => {
    await dispatch(leaveChatroomReset());
  }
}