import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOGOUT,
  UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE, UPDATE_TOKENFAILIURE,
  LOGIN_RESET,
  USERS_RESET, USERS_REQUEST, USERS_ERROR, USERS_SUCCESS,
  USER_REQUEST, USER_ERROR, USER_SUCCESS,
} from '../actions/userActions';

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
  loginIsFetching: false,
  isAuthenticated: user ? true : false,
  isUpdated: false,
  updateIsFetching: false,
  user,
  users: [],
  usersIsFetching: true,
  gottenUser: null,
  userIsFetching: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginIsFetching: action.loginIsFetching,
        isAuthenticated: action.isAuthenticated,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginIsFetching: action.loginIsFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        loginErrorMsg: action.loginErrorMsg,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginIsFetching: action.loginIsFetching,
        isAuthenticated: action.isAuthenticated,
        loginErrorMsg: action.loginErrorMsg
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        updateIsFetching: action.updateIsFetching,
        isUpdated: action.isUpdated,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updateIsFetching: action.updateIsFetching,
        isUpdated: action.isUpdated,
        updateErrorMsg: action.updateErrorMsg,
        user: action.user,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        updateIsFetching: action.updateIsFetching,
        isUpdated: action.isUpdated,
        updateErrorMsg: action.updateErrorMsg
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        loginIsFetching: action.loginIsFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      }
    case UPDATE_TOKENFAILIURE:
      return {
        ...state,
        updateIsFetching: action.updateIsFetching,
        isUpdated: action.isUpdated,
        updateErrorMsg: action.updateErrorMsg,
      }
    case LOGIN_RESET:
      return {
        ...state,
        loginIsFetching: action.loginIsFetching,
        isAuthenticated: action.isAuthenticated,
        loginErrorMsg: action.loginErrorMsg,
    }
    case USERS_REQUEST:
      return {
        ...state,
        usersIsFetching: action.usersIsFetching,
      };

    case USERS_ERROR:
      return {
        ...state,
        usersIsFetching: action.usersIsFetching,
        users: action.users,
        error: action.error,
      };

      case USERS_RESET:
      return {
        ...state,
        usersIsFetching: action.usersIsFetching,
        users: action.users,
      };
      case USERS_SUCCESS:
        return {
          ...state,
          usersIsFetching: action.usersIsFetching,
          users: action.users,
          error: action.error,
        };
      case USER_REQUEST:
        return {
          ...state,
          userIsFetching: action.userIsFetching,
        };
  
      case USER_ERROR:
        return {
          ...state,
          userIsFetching: action.userIsFetching,
          gottenUser: action.gottenUser,
          error: action.error,
        };
  
      case USER_SUCCESS:
        return {
          ...state,
          userIsFetching: action.userIsFetching,
          gottenUser: action.gottenUser,
          error: action.error,
        };
    default:
      return state;
  }
};