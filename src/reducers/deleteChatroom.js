import {
  CHATROOM_DELETE_RESET,
  CHATROOM_DELETE_REQUEST,
  CHATROOM_DELETE_SUCCESS,
  CHATROOM_DELETE_FAILURE
} from '../actions/deleteChatroom';

const initialState = {
  isFetching: false,
  error: null,
  actionSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CHATROOM_DELETE_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case CHATROOM_DELETE_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case CHATROOM_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case CHATROOM_DELETE_FAILURE:
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