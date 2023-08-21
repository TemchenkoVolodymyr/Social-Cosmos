import {initialStore} from "../initialState";

export const SET_USER = "SET_USER";
export const CHANGE_ONLINE_STATUS = "CHANGE_ONLINE_STATUS"

export const currentUserReducer = (user = initialStore.user, action) => {
  switch (action.type) {
    case SET_USER : return action.userData

    case CHANGE_ONLINE_STATUS:{
      return {
        ...user,isOnline:true
      }
    }
    default:
      return user
  }
}