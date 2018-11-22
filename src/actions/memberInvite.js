import { datarequest, noDataRequest } from '../api';
import { logoutUser } from './userActions';

// for the creation of chatrooms
export const MEMBER_INVITE_RESET = 'MEMBER_INVITE_RESET';
export const MEMBER_INVITE_REQUEST = 'MEMBER_INVITE_REQUEST';
export const MEMBER_INVITE_SUCCESS = 'MEMBER_INVITE_SUCCESS';
export const MEMBER_INVITE_FAILURE = 'MEMBER_INVITE_FAILURE';



// ---------- actions ---------

function memberInviteReset() {
  return {
    type: MEMBER_INVITE_RESET,
    isFetching: false,
    error: null,
    actionSuccess: false,
  }
}

function memberInviteRequest() {
  return {
    type: MEMBER_INVITE_REQUEST,
    isFetching: true,
    error: null,
    actionSuccess: false,
  }
}

function memberInviteError(error) {
  return {
    type: MEMBER_INVITE_FAILURE,
    isFetching: false,
    error: error,
    actionSuccess: false,
  }
}

function memberInviteSuccess(chatroom) {
  return {
    type: MEMBER_INVITE_SUCCESS,
    isFetching: false,
    error: null,
    actionSuccess: true,
  }
}

// ----- thunks ----------

export const sendMemberInvite = (chatroomName, username) => {
  return async (dispatch) => {
    dispatch(memberInviteRequest());
    try{
      console.log(chatroomName, username);
      const { result, status } = await datarequest(`auth/chatroom/${chatroomName}/invite/${username}/`, {}, 'POST');
      console.log(result, status);
      if(status == 204){
        return dispatch(memberInviteSuccess())
      }
      if(result.hasOwnProperty('error')){
        return dispatch(memberInviteError(result.error));
      }
      if(result.hasOwnProperty('message')) {
        if(result.message === "JWT Token is missing" || result.message === "JWT Token is incorrect") {
        console.log(result.message);
        return dispatch(logoutUser());
        }
      }
    } catch (e){
      return dispatch(memberInviteError(e));
    }
  }
}

export const resetMemberInvite = () => {
  return async (dispatch) => {
    await dispatch(memberInviteReset());
  }
}