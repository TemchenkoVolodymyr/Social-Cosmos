import {initialStore} from "../initialState";

export const SET_TEXTS = "SET_TEXTS"
export const SET_UP_NEW_TEST = "SET_UP_NEW_TEST"

export const WIPE_TEXTS = "WIPE_TEXTS"

export const currentChatTextReducer = (currentChatText = initialStore.currentChatDialogs,action) => {
  switch (action.type) {
    case SET_TEXTS : {
      return action.chatTexts
    }
    case SET_UP_NEW_TEST : {
      return [...currentChatText,action.newText]

    }
    case WIPE_TEXTS : {
      return currentChatText = null
    }
    default:return currentChatText
  }

}