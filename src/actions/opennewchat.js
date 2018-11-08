export const OPEN_CHAT = 'OPEN_CHAT';

function openChat(id,name) {
  return {
    type: OPEN_CHAT,
    chatid: id,
    chatname: name
  }
}

export const openNewChat = (id,name) => { return async (dispatch) => {  return dispatch(openChat(id,name)); } }