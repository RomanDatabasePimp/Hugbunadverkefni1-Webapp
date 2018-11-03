/* Since a compontent has to alert a state change for creating a new chat bouble we need 
   create a action for this. i dont know if i will need more later maybe will add but for now i 
   just need this one action */
export let GETNEWCHAT_ALERT = 'GETNEWCHAT_ALERT';


function openNewChat(chatid,chatname) {
  return {
    type: GETNEWCHAT_ALERT,
    chatid:chatid,
    chatname:chatname
  }
}

//export const openNewChat = (chatid,chatname) => { return async (dispatch) => {return dispatch(openNewChat(chatid,chatname)); }}