/* !!!!!!!!!!!!!!!!!!!!!!!!!! NOTE BEFORE READIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!
   There is allot of unsued implementations here that we dont fully know if we have 
   time to implement them server side but it was rly simple just do add support on the
   webApp end that i just did it so not all is used here but its ready when it will be
   implemented server-side */



import { datarequest } from '../api';

/* This is a small trcik i use, i want to have the power of riderection in actions
   this is the way i found that works, i dont know if its good but it works
   will be used for when register is succesful or when JTW token is provent to be invalid   */
import history from '../history';

/* A action is Split into twö parts
   Type: discribes the action preformed 
   Payload: the information to the app */

// -------------------------------------------------------------------

// typur fyrir notanda innskráningu
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT =  'LOGIN_LOGOUT';
export const LOGIN_RESET = 'LOGIN_RESET';

// typur fyrir notanda uppfærslu
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';
export const UPDATE_TOKENFAILIURE = 'UPDATE_TOKENFAILIURE';

// typur fyrir að ná í notendur
export const USERS_RESET = 'USERS_RESET';
export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_ERROR = 'USERS_ERROR';
export const USERS_SUCCESS = 'USERS_SUCCESS';

// typur fyrir að ná í notendur
export const USER_REQUEST = 'USER_REQUEST';
export const USER_ERROR = 'USER_ERROR';
export const USER_SUCCESS = 'USER_SUCCESS';

/* Svo litið sem hægt að lýsa um actions eina sem þeir gera er að 
   skila type of action og payload sem er state finnst að of mikið ves
   að gera notkunar lýsingar */

/*-----------------------ACTIONS START---------------------------- */

/* ----------------------------------------------------------------
   -------------------LOGGIN ACTIONS START-------------------------
   ---------------------------------------------------------------- */

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    loginIsFetching: true,
    isAuthenticated: false,
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    loginIsFetching: false,
    isAuthenticated: true,
    user,
    loginErrorMsg: null,
  }
}

function loginError(loginErrorMsg) {
  return {
    type: LOGIN_FAILURE,
    loginIsFetching: false,
    isAuthenticated: false,
    user: null,
    loginErrorMsg,
  }
}

/* ----------------------------------------------------------------
   -------------------LOGGIN ACTIONS end --------------------------
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   --------------User Update ACTIONS START ------------------------
   ---------------------------------------------------------------- */

function requestUpdate() {
  return {
    type: UPDATE_REQUEST,
    isUpdated: false,
    updateIsFetching: true,
  }
}
  
function reciveUpdate(user) {
  return {
    type: UPDATE_SUCCESS,
    isUpdated: true,
    updateIsFetching: false,
    updateErrorMsg: null,
    user,
  }
}
  
function errorUpdate(updateErrorMsg) {
  return {
    type: UPDATE_FAILURE,
    isUpdated: false,
    updateIsFetching: false,
    updateErrorMsg,
  }
}

function tokenInvUpdate(){
  return {
    type: UPDATE_TOKENFAILIURE,
    isUpdated: false,
    updateIsFetching: false,
    updateErrorMsg: null,
  }
}
/* ----------------------------------------------------------------
   --------------User Update ACTIONS END --------------------------
   ---------------------------------------------------------------- */

   
/* ----------------------------------------------------------------
   --------------get users ACTIONS START --------------------------
   ---------------------------------------------------------------- */
   function requestUsers() {
    return {
      type: USERS_REQUEST,
      usersIsFetching: true,
      error: null,
    }
  }
  
  function usersError(e) {
    return {
      type: USERS_ERROR,
      usersIsFetching: false,
      users: [],
      error: e,
    }
  }
  
  function receiveUsers(users) {
    return {
      type: USERS_SUCCESS,
      usersIsFetching: false,
      users,
      error: null,
    }
  }

  function resetUsers() {
    return {
      type: USERS_RESET,
      usersIsFetching: true,
      users: [],
      }
  }

/* ----------------------------------------------------------------
   ----------------get users ACTIONS END --------------------------
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   --------------get user ACTIONS START --------------------------
   ---------------------------------------------------------------- */
   function requestUser() {
    return {
      type: USER_REQUEST,
      userIsFetching: true,
      error: null,
    }
  }
  
  function userError(e) {
    return {
      type: USER_ERROR,
      userIsFetching: false,
      gottenUser: null,
      error: e,
    }
  }
  
  function receiveUser(gottenUser) {
    return {
      type: USER_SUCCESS,
      userIsFetching: false,
      gottenUser,
      error: null,
    }
  }

/* ----------------------------------------------------------------
   ----------------get user ACTIONS END --------------------------
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   ----------------------Extra ACTIONS Start-----------------------
   ---------------------------------------------------------------- */

function logginReset() {
  return {
    type: LOGIN_RESET,
    loginIsFetching: false,
    isAuthenticated: false,
    loginErrorMsg: null,
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    loginIsFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

/* ----------------------------------------------------------------
   ----------------------Extra ACTIONS END-------------------------
   ---------------------------------------------------------------- */

/*------------------------ACTIONS END------------------------------ */

/* Thunk leyfir okkur að skila falli en ekki bara hlut sem er 
   mjög þægilegt að taka i burt meira virkni frá Componentum */

/* Usage  : dispach(logoutUser())
    For   : nothing
    After : removes the user from local storage and riderects the client to / */
export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user');
    history.push('/');
    return dispatch(logout());
  }
}

/* Usage  : dispach(resetAuthState())
    For   : Nothing
    After : resets the state to default */
export const resetAuthState = () => {
  return async (dispatch) => {
    return dispatch(logginReset());
  }
}    

/* Usage  : dispach(loginUser(data))
   For    : data is a json obj with userName,password keys
   After  : Send a POST request on the Spring app and if the request was
            succseful we will store   */
export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(requestLogin());
    let login;
    try {
      login = await datarequest('login', data, 'POST');
    } catch (e) {
      return dispatch(loginError(e));
    }
    
    if(Array.isArray(login.result)) {
      if(login.result[0].hasOwnProperty('errors')){
        return dispatch(loginError(login.result[0].errors));
      }
    }
    
    window.localStorage.setItem('user', JSON.stringify(login.result[0]));    
    return dispatch(receiveLogin(login.result[0]));
  }
}