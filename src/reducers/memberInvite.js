import {
  MEMBER_INVITE_RESET,
  MEMBER_INVITE_REQUEST,
  MEMBER_INVITE_SUCCESS,
  MEMBER_INVITE_FAILURE
} from '../actions/memberInvite';

const initialState = {
  isFetching: false,
  error: null,
  actionSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case MEMBER_INVITE_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case MEMBER_INVITE_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case MEMBER_INVITE_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case MEMBER_INVITE_FAILURE:
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