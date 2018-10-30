import { VALIDATION_REQUEST, VALIDATION_SUCCESS, VALIDATION_FAILURE, VALIDATION_RESET } from '../actions/registerValidation';

const initialState = {
  isFetching: false,
  isValidated: false,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VALIDATION_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isValidated: action.isValidated,
      };
    case VALIDATION_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isValidated: action.isValidated,
        message: action.message,
      };
    case VALIDATION_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isValidated: action.isValidated,
        message: action.message
      };
    case VALIDATION_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        isValidated: action.isValidated,
        message: action.message
    };
    default:
      return state;
    }    
};