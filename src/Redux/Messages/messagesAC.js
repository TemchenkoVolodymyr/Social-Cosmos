import {SET_MESSAGES} from "./messagesReducer";


export const messagesAC = (messages) => {
  return{
    type:SET_MESSAGES,
    newMessages:messages
  }
}