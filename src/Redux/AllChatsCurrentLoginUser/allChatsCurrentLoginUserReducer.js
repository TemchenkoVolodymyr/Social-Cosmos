import {initialStore} from "../initialState";

export const SET_CHATS_CURRENT_USER = "SET_CHATS_CURRENT_USER"
export const allChatsCurrentLoginUserReducer = (allChats = initialStore.allChatsCurrentLoginUser,action) => {
  console.log(action.chat)
  switch (action.type) {
    case SET_CHATS_CURRENT_USER : {
      // return [...allChats,action.chat]

      const index = allChats?.findIndex(item => {
        action?.chat.map(ch => item._id === ch._id)
      })
      console.log(index)
      if(index === -1) {
        return [...allChats,action.chat]
      }else{
        return allChats
      }
    }
    default:return allChats
  }
}