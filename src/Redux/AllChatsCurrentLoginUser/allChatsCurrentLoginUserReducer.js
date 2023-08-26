import {initialStore} from "../initialState";

export const SET_CHATS_CURRENT_USER = "SET_CHATS_CURRENT_USER"
export const WIPE_ALL_CHATS = "WIPE_ALL_CHATS"
export const allChatsCurrentLoginUserReducer = (allChats = initialStore.allChatsCurrentLoginUser, action) => {
  switch (action.type) {
    case SET_CHATS_CURRENT_USER : {
      if(allChats.length >= 1) {

        allChats.map(chat => {
          const check = chat.chatId.includes(action.chats.chatId)
          if (!check) {
            return [...allChats, action.chats]
          }
        })
      }else{
        return [...allChats,action.chats]
      }
      return allChats
    }

    case WIPE_ALL_CHATS : {
      return allChats = []
    }
    default:
      return allChats
  }
}