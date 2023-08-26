import {SET_TEXTS, SET_UP_NEW_TEST, WIPE_TEXTS} from "./currentChatTextReducer";

export const currentChatTextAC = (chatItems) => {
return{
  type:SET_TEXTS,
  chatTexts:chatItems
}
}

export const currentChatNewTextAC = (newText) => {

  return{
    type:SET_UP_NEW_TEST,
    newText
  }
}

export const wipeCurrentTexts = () => {
  return{
    type:WIPE_TEXTS
  }
}