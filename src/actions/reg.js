import { datarequest } from '../api';


export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_RESET = 'REGISTER_RESET';

function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isRegistrated: false,
    isFetching: true,
    message:null,
  }
}

function receivedRegister() {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isRegistrated: true,
    message: null,
  }
}

function RegisterError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isRegistrated: false,
    message
  }
}

function registerReset() {
  return {
    type: REGISTER_RESET,
    isFetching: false,
    isRegistrated: false,
    message:null,
  }
}

/* Notkun : dispach(registerUser(data))
    Fyrir : data is a  json obj
    Eftir : Sends a http POST request on our Spring boot api */
export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch(requestRegister());
    
    let register;
    /* try to fetch the data from api */
    try {
      register = await datarequest('register', data, 'POST');
    } catch (e) {
        return dispatch(RegisterError(e));
    }
    
    /* we know we get somekind of array and for the register we will always get 
       an array with a size of 1 and it will contain a json obj errors with has many errors */
    if (Array.isArray(register.result)) {
      if(register.result[0].hasOwnProperty('errors')){
        return dispatch(RegisterError(register.result[0].errors));
      }
    }

    return dispatch(receivedRegister());
  }
}

/* Notkun : dispach(registerStateReset())
    Fyrir : ekkert
    Eftir : nullstillir allar stöður i reg
            i upphafsgildin þeirra */
export const registerStateReset = () => {
  return async (dispatch) => {
    return dispatch(registerReset());
  }
}