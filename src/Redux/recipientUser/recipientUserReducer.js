import {initialStore} from "../initialState";

export const SET_REC_USER = "SET_REC_USER"
export const recipientUserReducer = (recUser = initialStore.recipientUser,action) => {
switch (action.type) {
  case SET_REC_USER : {
    return action.newRecUser
  }

  default: return recUser
}
}