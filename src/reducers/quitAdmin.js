import {
  QUIT_ADMIN_RESET,
  QUIT_ADMIN_REQUEST,
  QUIT_ADMIN_SUCCESS,
  QUIT_ADMIN_FAILURE
} from '../actions/quitAdmin';

const initialState = {
  isFetching: false,
  error: null,
  actionSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case QUIT_ADMIN_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case QUIT_ADMIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case QUIT_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        actionSuccess: action.actionSuccess,
      }
    case QUIT_ADMIN_FAILURE:
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