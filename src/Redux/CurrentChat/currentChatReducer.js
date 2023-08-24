import {initialStore} from "../initialState";


export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT"
export const currentChatReducer = (currentChat = initialStore.currentChat, action) => {
  switch (action.type) {

    case SET_CURRENT_CHAT : {
      return action.chat
    }
    default:
      return currentChat
  }
}