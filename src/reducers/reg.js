import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_RESET } from '../actions/reg';

const initialState = {
  isFetching: false,
  isRegistrated: false,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistrated: action.isRegistrated,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistrated: action.isRegistrated,
        message: action.message,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistrated: action.isRegistrated,
        message: action.message
      };
    case REGISTER_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistrated: action.isRegistrated,
        message: action.message
    };
    default:
      return state;
  }    
};