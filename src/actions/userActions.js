/* sótt HTTP request föll úr API er reynt 
  að nota eins fá föll og hægt er  næ að sleppa með 3 */
import { nodatarequest, datarequest, formdatarequest } from '../api';

/* til að gera þetta einfaldara og aðskilgreina virkni frá componentum 
  við gerum þetta þannig að ef notanda token er invalid þá munu thunks
  sjá um riderect i actions. þetta er mjög clean leið til að gera þetta utaf núna
  öll önnur actions geta kallað fall heðan sem mun sjá um að
  hreinsa notanda og rederecta á /login  */
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

/* Notkun : dispach(logoutUser())
    Fyrir : ekkert
    Eftir : hreinsar user, token i local storage og riderectar hann á login */
export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    history.push('/login');
    return dispatch(logout());
  }
}

/* Notkun : dispach(resetAuthState())
    Fyrir : ekkert
    Eftir : upphafsStillir allar stoður i atuh i upphafsgildin þeirra */
export const resetAuthState = () => {
  return async (dispatch) => {
    return dispatch(logginReset());
  }
}    

/* Notkun : dispach(loginUser(data))
   Fyrir  : data er json obj með properties username,password
   Eftir  : Gerir first post á login og ef það kemur upp villa þá
            er sent villa til notandans annars þá er fengið token og notanda
            og vistað þau i localstorage  */
export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(requestLogin());
    // reynt er að senda beðni á heroku
    let login;
    try {
      login = await datarequest('login', data, 'POST');
    } catch (e) {
      return dispatch(loginError(e));
    }
    // ef status kóði er yfir 400 þá er það villa
    if (login.status >= 400) {
      // þá er til json obj með property error sem hægt er að byrta
      return dispatch(loginError(login.result.error));
    }
    window.localStorage.setItem('token', login.result.token);
    window.localStorage.setItem('user', JSON.stringify(login.result.user));    
    return dispatch(receiveLogin(login.result.user));
  }
}            