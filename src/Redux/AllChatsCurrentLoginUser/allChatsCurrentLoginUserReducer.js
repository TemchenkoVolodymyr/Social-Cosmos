import {initialStore} from "../initialState";

export const SET_CHATS_CURRENT_USER = "SET_CHATS_CURRENT_USER"
export const WIPE_ALL_CHATS = "WIPE_ALL_CHATS"


export const allChatsCurrentLoginUserReducer = (allChats = initialStore.allChatsCurrentLoginUser, action) => {

  switch (action.type) {
    case SET_CHATS_CURRENT_USER : {
      const newChats = allChats.find(chat => chat.chatId === action.chats.chatId)
      if(newChats) {
        return allChats;
      }else{
        return [...allChats,action.chats]
      }

    }

    case WIPE_ALL_CHATS : {
      return allChats = []
    }
    default:
      return allChats
  }
}