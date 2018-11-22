import { datarequest, noDataRequest } from '../api';
import { logoutUser } from './userActions';

// for the creation of chatrooms
export const QUIT_ADMIN_RESET = 'QUIT_ADMIN_RESET';
export const QUIT_ADMIN_REQUEST = 'QUIT_ADMIN_REQUEST';
export const QUIT_ADMIN_SUCCESS = 'QUIT_ADMIN_SUCCESS';
export const QUIT_ADMIN_FAILURE = 'QUIT_ADMIN_FAILURE';



// ---------- actions ---------

function quitAdminReset() {
  return {
    type: QUIT_ADMIN_RESET,
    isFetching: false,
    error: null,
    actionSuccess: false,
  }
}

function quitAdminRequest() {
  return {
    type: QUIT_ADMIN_REQUEST,
    isFetching: true,
    error: null,
    actionSuccess: false,
  }
}

function quitAdminError(error) {
  return {
    type: QUIT_ADMIN_FAILURE,
    isFetching: false,
    error: error,
    actionSuccess: false,
  }
}

function quitAdminSuccess(chatroom) {
  return {
    type: QUIT_ADMIN_SUCCESS,
    isFetching: false,
    error: null,
    actionSuccess: true,
  }
}

// ----- thunks ----------

export const quitAdmin = (chatroomName) => {
  return async (dispatch) => {
    dispatch(quitAdminRequest());
    try{
      const { result, status } = await noDataRequest(`auth/chatroom/${chatroomName}/quitadmin/`, 'DELETE');
      console.log(result, status);
      if(status == 204){
        return dispatch(quitAdminSuccess())
      }
      if(result.hasOwnProperty('error')){
        return dispatch(quitAdminError(result.error));
      }
      if(result.hasOwnProperty('message')) {
        if(result.message === "JWT Token is missing" || result.message === "JWT Token is incorrect") {
        console.log(result.message);
        return dispatch(logoutUser());
        }
      }
    } catch (e){
      return dispatch(quitAdminError(e));
    }
  }
}

export const resetAdminQuit = () => {
  return async (dispatch) => {
    await dispatch(quitAdminReset());
  }
}