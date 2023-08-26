import {SET_REC_USER, WIPE_RECIPIENT_USER} from "./recipientUserReducer";

export const recipientUserAC = (newRecUser) => {
  return{
    type:SET_REC_USER,
    newRecUser
  }
}

export const wipeRecipientUserAC = () => {
  return{
    type:WIPE_RECIPIENT_USER
  }
}