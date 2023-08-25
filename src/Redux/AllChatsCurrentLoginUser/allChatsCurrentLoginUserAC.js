import {SET_CHATS_CURRENT_USER} from "./allChatsCurrentLoginUserReducer";


export const allChatsCurrentLoginUserAC = (chat) => {
  return{
    type:SET_CHATS_CURRENT_USER,
    chat
  }
}