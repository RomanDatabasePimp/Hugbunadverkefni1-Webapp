import { combineReducers } from 'redux'
import userActions from './userActions'
import reg from './reg'

/* Utaf store er eitt stór js object
  við tengjum alla reducera okkar saman 
  þá er hægt kalla á state.auth.(stateSemAuthHefur) */
export default combineReducers({
  reg,
  userActions
});
