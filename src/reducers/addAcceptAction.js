import { ADD_ACC_F_REQUEST,ADD_ACC_F_SUCCESS,ADD_ACC_F_FAIL,ADD_ACC_F_RESET } from '../actions/addAcceptAction';

const initialState = {
  isFetching: false,
  error: null,
  addAccepted: false,
};
  
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACC_F_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        addAccepted: action.addAccepted
      };
    case ADD_ACC_F_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        addAccepted: action.addAccepted
      };
    case ADD_ACC_F_FAIL:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        addAccepted: action.addAccepted
      };
    case ADD_ACC_F_RESET:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        addAccepted: action.addAccepted
      };
    default:
      return state;
    }    
};