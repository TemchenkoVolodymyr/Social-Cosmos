import {initialStore} from "../initialState";

export const SET_NEW_ONLINE_MESSAGE = 'SET_NEW_ONLINE_MESSAGE'
export const RESET_MESSAGES = "RESET_MESSAGES"

export const onlineMessagesReducer = (onlineMessages = initialStore.newOnlineMessage, action) => {
  switch (action.type) {

    case SET_NEW_ONLINE_MESSAGE : {
      return [...onlineMessages, action.message]
    }
    case RESET_MESSAGES: return  onlineMessages = []
    default:
      return onlineMessages
  }
}