import { combineReducers } from 'redux'
import userActions from './userActions'
import reg from './reg'
import registerValidation from './registerValidation'
import initialloadofapp from './initialloadofapp'
import opennewchat from './opennewchat'
import chatBoublePolling from './chatBoublePolling'

/* Utaf store er eitt stór js object
  við tengjum alla reducera okkar saman 
  þá er hægt kalla á state.auth.(stateSemAuthHefur) */
export default combineReducers({
  reg,
  userActions,
  registerValidation,
  initialloadofapp,
  opennewchat,
  chatBoublePolling
});
