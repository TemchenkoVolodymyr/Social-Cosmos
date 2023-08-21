import {initialStore} from "../initialState";

export const SET_USER = "SET_USER"

export const currentUserReducer = (user = initialStore.user, action) => {
  switch (action.type) {
    case SET_USER : return action.userData

    default:
      return user
  }
}