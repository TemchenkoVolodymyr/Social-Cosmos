import {initialStore} from "../initialState";

export const SET_REC_USER = "SET_REC_USER"
export const WIPE_RECIPIENT_USER = "WIPE_RECIPIENT_USER"
export const recipientUserReducer = (recUser = initialStore.recipientUser,action) => {
switch (action.type) {
  case SET_REC_USER : {
    return action.newRecUser
  }
    case WIPE_RECIPIENT_USER : {
      return recUser = null
    }
  default: return recUser
}
}