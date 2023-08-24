import {SET_CURRENT_CHAT} from "./currentChatReducer";

export const currentChatAC = (chatData) => {
  return{
    type:SET_CURRENT_CHAT,
    chat:chatData
  }
}