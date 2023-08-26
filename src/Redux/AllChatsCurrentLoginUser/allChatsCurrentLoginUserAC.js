import {SET_CHATS_CURRENT_USER, WIPE_ALL_CHATS} from "./allChatsCurrentLoginUserReducer";


export const allChatsCurrentLoginUserAC = (chats) => {
  return{
    type:SET_CHATS_CURRENT_USER,
    chats
  }
}

export const wipeAllChats = () => {
  return{
    type:WIPE_ALL_CHATS
  }
}