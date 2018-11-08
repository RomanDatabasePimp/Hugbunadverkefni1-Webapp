import { noDataRequest, datarequest } from '../api';

/* This class is repsonsible for maintaining states for fetching  everything about the user */

/* You can debade that this action should be in userActions.js and it should but the 
   userAction reducer is cluster fucked to the max and i cant follow anything there at this point
   so this is just to make this abit more readable */
export const GETUSERINFO_REQUEST = 'GETUSERINFO_REQUEST';
export const GETUSERINFO_SUCCESS = 'GETUSERINFO_SUCCESS';
export const GETUSERINFO_FAILURE = 'GETUSERINFO_FAILURE';
export const GETUSERINFO_RESET = 'GETUSERINFO_RESET';

function requestUserInformation() {
  return {
    type: GETUSERINFO_REQUEST,
    isFetching: true,

    errorMsg:null,
    chatroomAdminInvites:null,
    friendRequestees:null,
    chatroomInvites:null,
    chatroomRequests:null,
    chatrooms:null,
    friends:null,
    friendRequestors:null
  }
}

function receivedUserInformation(chatroomAdminInvites,friendRequestees,chatroomInvites,chatroomRequests,
                                 chatrooms,friends,friendRequestors ) {
  return {
    type: GETUSERINFO_SUCCESS,
    isFetching: false,
    
    errorMsg:null,
    chatroomAdminInvites,
    friendRequestees,
    chatroomInvites,
    chatroomRequests,
    chatrooms,
    friends,
    friendRequestors
  }
}
  
function userInformationError(errorMsg) {
  return {
    type: GETUSERINFO_FAILURE,
    isFetching: false,

    errorMsg,
    chatroomAdminInvites:null,
    friendRequestees:null,
    chatroomInvites:null,
    chatroomRequests:null,
    chatrooms:null,
    friends:null,
    friendRequestors:null
  }
}
  
function userInformationReset() {
  return {
    type: GETUSERINFO_RESET,
    isFetching: false,

    errorMsg:null,
    chatroomAdminInvites:null,
    friendRequestees:null,
    chatroomInvites:null,
    chatroomRequests:null,
    chatrooms:null,
    friends:null,
    friendRequestors:null
  }
}

/* Usage : dispach(UserInformationReset())
    For  : nothing
    After: resets the state to default in initialloadofapp */
export const userInfoStateReset = () => { return async (dispatch) => {  return dispatch(userInformationReset()); } }

/* Usage : dispach(getUserData())
    For  : nothing 
    After: performs a http GET request on url/user/getallrelations  and returns whatever the 
           Spring boot api send back */
/* Note since we are using JTW tokens we send them in the headder where they will be validated 
   and then information about the user in the JTW is used to fetch appropriate stuff  this way 
   we are making the full use of our webtokens */
export const getUserData = () => {
  return async (dispatch) => {
    dispatch(requestUserInformation());

    let request;
    /* try to fetch the data from api */
    try {
      request = await noDataRequest('auth/user/getallrelations', 'GET');
    } catch (e) {
      return dispatch(userInformationError(e));
    }
    
    if(request.result.hasOwnProperty('error')){
      return dispatch(userInformationError(request.result.error));
    }
     
    return dispatch(receivedUserInformation(request.result.chatroomAdminInvites,
                                     request.result.friendRequestees,
                                     request.result.chatroomInvites,
                                     request.result.chatroomRequests,
                                     request.result.chatrooms,
                                     request.result.friends,
                                     request.result.friendRequestors,
                                     ));
  }
}
