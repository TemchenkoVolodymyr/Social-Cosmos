import {SET_REC_USER} from "./recipientUserReducer";

export const recipientUserAC = (newRecUser) => {
  return{
    type:SET_REC_USER,
    newRecUser
  }
}