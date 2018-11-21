import { combineReducers } from 'redux'
import userActions from './userActions'
import reg from './reg'
import registerValidation from './registerValidation'
import initialloadofapp from './initialloadofapp'
import opennewchat from './opennewchat'
import chatroom from './chatroom'
import addAcceptAction from './addAcceptAction'
import adminInvite from './adminInvite'
import memberInvite from './memberInvite'
import deleteChatroom from './deleteChatroom'
import leaveChatroom from './leaveChatroom'
import quitAdmin from './quitAdmin'

/* Utaf store er eitt stór js object
  við tengjum alla reducera okkar saman 
  þá er hægt kalla á state.auth.(stateSemAuthHefur) */
export default combineReducers({
  reg,
  userActions,
  registerValidation,
  initialloadofapp,
  opennewchat,
  chatroom,
  addAcceptAction,
  adminInvite,
  memberInvite,
  deleteChatroom,
  leaveChatroom,
  quitAdmin,
});
