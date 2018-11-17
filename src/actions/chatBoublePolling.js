import { noDataRequest } from '../api';

/* this is a simple action that polls a certain chat logs 
   from the server to determinate.
   Keep in mind since this is a polling action we want to reduce the amount 
   of state changes to prevent uncessary re-renders of components 
   speacially when there will be so many in reality we just online have one
   state change */
export const POLL_SUCCESS = 'POLL_SUCCESS';
export const POLL_FAILURE = 'POLL_FAILURE';
export const POLL_REQUEST = 'POLL_REQUEST';

function pollRequest() {
  return {
    type: POLL_REQUEST,
    msg: null,
    chatroom:null
  }
}

function pollFail(msg) {
  return {
    type: POLL_FAILURE,
    msg: msg,
    chatroom:null
  }
}

function pollSucc(chatroom) {
  return {
    type: POLL_SUCCESS,
    msg:null,
    chatroom:chatroom
  }
}

/* Usage : dispach(pollChat(chatname))
    For  : chatname is the Id of the chat 
    After: performs a HTTP get request on api/auth/chatroom/{chatname}
           and returns whatever the server returns */
export const pollChat = (chatname) => {
 return async (dispatch) => {
  dispatch(pollRequest())
  let poll;
  /* try to fetch the data from api */
  try {
    poll = await noDataRequest(`auth/chatroom/${chatname}`, 'GET');
  } catch (e) {
    return dispatch(pollFail(e));
  }
  if(poll.result.hasOwnProperty("error")) {
    return dispatch(pollFail(poll.result.error))
  }
  return dispatch(pollSucc(poll.result))
 }
}