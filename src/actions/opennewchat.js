export const OPEN_CHAT = 'OPEN_CHAT';
export const OPEN_REQUEST = 'OPEN_REQUEST';

function openChat(id,name) {
  return {
    type: OPEN_CHAT,
    chatid: id,
    chatname: name
  }
}

function openChatRequest() {
  return {
    type: OPEN_REQUEST,
    chatid: null,
    chatname: null
  }
}

export const openNewChat = (id,name) => { 
  return async (dispatch) => {
    dispatch(openChatRequest())

    return dispatch(openChat(id,name));
  }
}