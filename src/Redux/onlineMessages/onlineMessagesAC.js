import {RESET_MESSAGES, SET_NEW_ONLINE_MESSAGE} from "./onlineMessagesReducer";


export const onlineMessagesAC = (message) => {
  return {
    type: SET_NEW_ONLINE_MESSAGE,
    message
  }
}
export const resetMessagesAC = () => {
  return{
    type:RESET_MESSAGES
  }
}