import { GETUSERINFO_REQUEST,GETUSERINFO_SUCCESS,GETUSERINFO_FAILURE,GETUSERINFO_RESET } from '../actions/initialloadofapp';

const initialState = {
    isFetching: false,
    errorMsg:null,
    chatroomAdminInvites:null,
    friendRequestees:null,
    chatroomInvites:null,
    chatroomRequests:null,
    chatrooms:null,
    friends:null,
    friendRequestors:null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GETUSERINFO_REQUEST:
        return {
          ...state,
          isFetching: action.isFetching,
          errorMsg:action.errorMsg,
          chatroomAdminInvites:action.chatroomAdminInvites,
          friendRequestees:action.friendRequestees,
          chatroomInvites:action.chatroomInvites,
          chatroomRequests:action.chatroomRequests,
          chatrooms:action.chatrooms,
          friends:action.friends,
          friendRequestors:action.friendRequestors
        };
      case GETUSERINFO_SUCCESS:
        return {
          ...state,
          isFetching: action.isFetching,
          errorMsg:action.errorMsg,
          chatroomAdminInvites:action.chatroomAdminInvites,
          friendRequestees:action.friendRequestees,
          chatroomInvites:action.chatroomInvites,
          chatroomRequests:action.chatroomRequests,
          chatrooms:action.chatrooms,
          friends:action.friends,
          friendRequestors:action.friendRequestors
        };
      case GETUSERINFO_FAILURE:
        return {
          ...state,
          isFetching: action.isFetching,
          errorMsg:action.errorMsg,
          chatroomAdminInvites:action.chatroomAdminInvites,
          friendRequestees:action.friendRequestees,
          chatroomInvites:action.chatroomInvites,
          chatroomRequests:action.chatroomRequests,
          chatrooms:action.chatrooms,
          friends:action.friends,
          friendRequestors:action.friendRequestors
        };
      case GETUSERINFO_RESET:
        return {
          ...state,
          isFetching: action.isFetching,
          errorMsg:action.errorMsg,
          chatroomAdminInvites:action.chatroomAdminInvites,
          friendRequestees:action.friendRequestees,
          chatroomInvites:action.chatroomInvites,
          chatroomRequests:action.chatroomRequests,
          chatrooms:action.chatrooms,
          friends:action.friends,
          friendRequestors:action.friendRequestors
      };
      default:
        return state;
    }    
};