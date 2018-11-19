import { datarequest, noDataRequest } from '../api';

// for the creation of chatrooms
export const ADMIN_INVITE_RESET = 'ADMIN_INVITE_RESET';
export const ADMIN_INVITE_REQUEST = 'ADMIN_INVITE_REQUEST';
export const ADMIN_INVITE_SUCCESS = 'ADMIN_INVITE_SUCCESS';
export const ADMIN_INVITE_FAILURE = 'ADMIN_INVITE_FAILURE';



// ---------- actions ---------

function adminInviteReset() {
  return {
    type: ADMIN_INVITE_RESET,
    isFetching: false,
    error: null,
    actionSuccess: false,
  }
}

function adminInviteRequest() {
  return {
    type: ADMIN_INVITE_REQUEST,
    isFetching: true,
    error: null,
    actionSuccess: false,
  }
}

function adminInviteError(error) {
  return {
    type: ADMIN_INVITE_FAILURE,
    isFetching: false,
    error: error,
    actionSuccess: false,
  }
}

function adminInviteSuccess(chatroom) {
  return {
    type: ADMIN_INVITE_SUCCESS,
    isFetching: false,
    error: null,
    actionSuccess: true,
  }
}

// ----- thunks ----------

export const sendAdminInvite = (chatroomName, username) => {
  return async (dispatch) => {
    dispatch(adminInviteRequest());
    try{
      console.log(chatroomName, username);
      const { result, status } = await datarequest(`auth/chatroom/${chatroomName}/admininvite/${username}/`, {}, 'POST');
      
      if(status == 204){
        return dispatch(adminInviteSuccess())
      }
      if(result.hasOwnProperty('error')){
        return dispatch(adminInviteError(result.error));
      }
    } catch (e){
      return dispatch(adminInviteError(e));
    }
  }
}

export const resetAdminInvite = () => {
  return async (dispatch) => {
    await dispatch(adminInviteReset());
  }
}