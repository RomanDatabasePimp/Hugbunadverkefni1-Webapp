import { datarequest } from '../api';

export const VALIDATION_REQUEST = 'VALIDATION_REQUEST';
export const VALIDATION_SUCCESS = 'VALIDATION_SUCCESS';
export const VALIDATION_FAILURE = 'VALIDATION_FAILURE';
export const VALIDATION_RESET   = 'VALIDATION_RESET';

function requestValidate() {
  return {
    type: VALIDATION_REQUEST,
    isValidated: false,
    isFetching: true,
    message:null,
  }
}
  
function receivedValidate() {
  return {
    type: VALIDATION_SUCCESS,
    isFetching: false,
    isValidated: true,
    message: null,
  }
}
  
function ValidateError(message) {
  return {
    type: VALIDATION_FAILURE,
    isFetching: false,
    isValidated: false,
    message
  }
}
  
function ValidateReset() {
  return {
    type: VALIDATION_RESET,
    isFetching: false,
    isValidated: false,
    message:null,
  }
}

/* Notkun : dispach(validateUser(data))
    Fyrir : data is string that will be appendet to the ulr endpoint as param
    Eftir : Sends a HTTP PUT to the Spring API  */
export const validateUser = (data) => {
  return async (dispatch) => {
    dispatch(requestValidate());
    let validation;
    /* try to fetch the data from api */
    try {
        validation = await datarequest(`validation/${data}`,{}, 'PUT');
    } catch (e) {
        return dispatch(ValidateError(e));
    }
    console.log(validation.result);
    /* we know we get somekind of array and for the register we will always get 
             an array with a size of 1 and it will contain a json obj errors with has many errors */
    if (Array.isArray(validation.result)) {
      if(validation.result[0].hasOwnProperty('error')){
        return dispatch(ValidateError(validation.result[0].error));
      }
    }
      
    return dispatch(receivedValidate());
  }
}

/* Usage : dispach(validationStateReset())
    For  : ekkert
   After : reset the to the default state in registerValidation */
export const validationStateReset = () => { return async (dispatch) => {  return dispatch(ValidateReset()); } }