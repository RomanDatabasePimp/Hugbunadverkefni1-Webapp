import {
  CHATROOM_LEAVE_RESET,
  CHATROOM_LEAVE_REQUEST,
  CHATROOM_LEAVE_SUCCESS,
  CHATROOM_LEAVE_FAILURE
} from '../actions/leaveChatroom';

const initialState = {
  isFetching: false,
  error: null,
  actionSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CHATROOM_LEAVE_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case CHATROOM_LEAVE_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case CHATROOM_LEAVE_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case CHATROOM_LEAVE_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    default:
      return state;
  }
}