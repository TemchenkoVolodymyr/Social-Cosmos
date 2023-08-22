import {initialStore} from "../initialState";


export const SET_MESSAGES = "SET_MESSAGES"

export const messagesReducer = (messages = initialStore.messages,action) => {
  console.log(action.newMessages)
switch (action.type) {
  case SET_MESSAGES : {
    return action.newMessages
  }
  default:return messages
}
}