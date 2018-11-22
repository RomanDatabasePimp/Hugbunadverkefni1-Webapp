import { datarequest,noDataRequest } from '../api';
import { logoutUser } from './userActions';
/* the way we add and accept friends is the same , i.e same function calls
   but the server responds differantly so we basicly one action that 
   handles two things */

export const ADD_ACC_F_REQUEST = 'ADD_ACC_F_REQUEST';
export const ADD_ACC_F_SUCCESS = 'ADD_ACC_F_SUCCESS';
export const ADD_ACC_F_FAIL = 'ADD_ACC_F_FAIL';
export const ADD_ACC_F_RESET ='ADD_ACC_F_RESET';

function addOrAcceptRequest() {
  return {
    type: ADD_ACC_F_REQUEST,
    isFetching: true,
    error: null,
    addAccepted: false
  }
}

function addOrAcceptSuccess() {
  return {
    type: ADD_ACC_F_SUCCESS,
    isFetching: false,
    error: null,
    addAccepted: true
  }
}

function addOrAcceptError(err) {
  return {
    type: ADD_ACC_F_FAIL,
    isFetching: false,
    error: err,
    addAccepted: false
  }
}

function addOrAcceptResetState() {
  return {
    type: ADD_ACC_F_RESET,
    isFetching: false,
    error: null,
    addAccepted: false
  }
}


/* SOORRYY :(((( LITILL TIMI VAR EFTIR HER I FEEL ASHAMED TO DO THIS :( 
    HAVE MERCY ON ME  */

/* Usage : dispatch(addOrAcceptUser(usr,method))
    For  : usr is the username of the add er accepted client
    After: sends a HTTP POST REQUEST /auth/user/friends/{usr} 
           and returns whatever the server returns */
export const addOrAcceptUser = (usr,method) => {
  return async (dispatch) => {
    dispatch(addOrAcceptRequest());
    try{
      let request = await datarequest(`auth/user/friends/${usr}`,{},method);
      if(request.result){
        if(request.result.hasOwnProperty('error')) {
          return dispatch(addOrAcceptError(request.result.error));
        }
        if(request.result.hasOwnProperty('message')) {
          if(request.result.message === "JWT Token is missing" || request.result.message === "JWT Token is incorrect") {
          console.log(request.result.message);
          return dispatch(logoutUser());
          }
        }
      }
      return dispatch(addOrAcceptSuccess());

    } catch (e){
      return dispatch(addOrAcceptError(e));
    }
  }
}

/* Usage : dispatch(acceptChatInv(val))
    For  : val is the chatname
    After: sends a HTTP POST REQUEST http://localhost:9090/auth/chatroom/{chatroom}/join
           and returns whatever the server returns */
export const acceptChatInv = (val) => {
  return async (dispatch) => {
    dispatch(addOrAcceptRequest());
    try{
      let request = await datarequest(`auth/chatroom/${val}/join`,{},"POST");
      if(request.result){
        if(request.result.hasOwnProperty('error')) {
          return dispatch(addOrAcceptError(request.result.error));
        }
        if(request.result.hasOwnProperty('message')) {
          if(request.result.message === "JWT Token is missing" || request.result.message === "JWT Token is incorrect") {
          console.log(request.result.message);
          return dispatch(logoutUser());
          }
        }
      }
      return dispatch(addOrAcceptSuccess());
    } catch (e){
      return dispatch(addOrAcceptError(e));
    }
  }
}

/* Usage : dispatch(rejectChatInv(val))
    For  : val is the chatname
    After: sends a HTTP POST REQUEST http://localhost:9090/auth/chatroom/{chatroom}/join
           and returns whatever the server returns */
export const rejectChatInv = (val) => {
  return async (dispatch) => {
    dispatch(addOrAcceptRequest());
    try{
      let request = await datarequest(`auth/chatroom/${val}/rejectchatroominvite`,{},"DELETE");
      if(request.result){
        if(request.result.hasOwnProperty('error')) {
          return dispatch(addOrAcceptError(request.result.error));
        }
        if(request.result.hasOwnProperty('message')) {
          if(request.result.message === "JWT Token is missing" || request.result.message === "JWT Token is incorrect") {
          console.log(request.result.message);
          return dispatch(logoutUser());
          }
        }
      }
      return dispatch(addOrAcceptSuccess());
    } catch (e){
      return dispatch(addOrAcceptError(e));
    }
  }
}

/* Usage : dispatch(acceptAdminChatInv(val))
    For  : val is the chatname
    After: sends a HTTP POST REQUEST http://localhost:9090/auth/chatroom/{chatroomName}/acceptadmininvite
           and returns whatever the server returns */
export const acceptAdminChatInv = (val) => {
  return async (dispatch) => {
    dispatch(addOrAcceptRequest());
    try{
      let request = await datarequest(`auth/chatroom/${val}/acceptadmininvite`,{},"POST");
      if(request.result){
        if(request.result.hasOwnProperty('error')) {
          return dispatch(addOrAcceptError(request.result.error));
        }
        if(request.result.hasOwnProperty('message')) {
          if(request.result.message === "JWT Token is missing" || request.result.message === "JWT Token is incorrect") {
          console.log(request.result.message);
          return dispatch(logoutUser());
          }
        }
      }
      return dispatch(addOrAcceptSuccess());
    } catch (e){
      return dispatch(addOrAcceptError(e));
    }
  }
}


/* Usage : dispatch(rejectAdminChatInv(val))
    For  : val is the chatname
    After: sends a HTTP DELETE REQUEST http://localhost:9090/auth/chatroom/{chatroomName}/rejectadmininvite
           and returns whatever the server returns */
export const rejectAdminChatInv = (val) => {
  return async (dispatch) => {
    dispatch(addOrAcceptRequest());
    try{
      let request = await noDataRequest(`auth/chatroom/${val}/rejectadmininvite`,"DELETE");
      if(request.result){
        if(request.result.hasOwnProperty('error')) {
          return dispatch(addOrAcceptError(request.result.error));
        }
        if(request.result.hasOwnProperty('message')) {
          if(request.result.message === "JWT Token is missing" || request.result.message === "JWT Token is incorrect") {
          console.log(request.result.message);
          return dispatch(logoutUser());
          }
        }
      }
      return dispatch(addOrAcceptSuccess());
    } catch (e){
      return dispatch(addOrAcceptError(e));
    }
  }
}


/* Usage : dispatch(rejectFriend(usr))
    For  : usr is the username of the add er accepted client
    After: sends a HTTP POST REQUEST /auth/user/friends/{usr} 
           and returns whatever the server returns */
export const rejectFriend = (usr) => {
  return async (dispatch) => {
    dispatch(addOrAcceptRequest());
    try{
      let request = await noDataRequest(`auth/user/friendRequest/${usr}`,"DELETE");
      if(request.result){
        if(request.result.hasOwnProperty('error')) {
          return dispatch(addOrAcceptError(request.result.error));
        }
        if(request.result.hasOwnProperty('message')) {
          if(request.result.message === "JWT Token is missing" || request.result.message === "JWT Token is incorrect") {
          console.log(request.result.message);
          return dispatch(logoutUser());
          }
        }
      }
      return dispatch(addOrAcceptSuccess());

    } catch (e){
      return dispatch(addOrAcceptError(e));
    }
  }
}

/* we need this to wipe the state clean so we dont keep any erros */
export const addOrAccepReset = () => {
  return async (dispatch) => {
    return dispatch(addOrAcceptResetState());
  }
}