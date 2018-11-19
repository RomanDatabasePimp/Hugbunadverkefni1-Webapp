import {
  ADMIN_INVITE_RESET,
  ADMIN_INVITE_REQUEST,
  ADMIN_INVITE_SUCCESS,
  ADMIN_INVITE_FAILURE
} from '../actions/adminInvite';

const initialState = {
  isFetching: false,
  error: null,
  actionSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADMIN_INVITE_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case ADMIN_INVITE_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case ADMIN_INVITE_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case ADMIN_INVITE_FAILURE:
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