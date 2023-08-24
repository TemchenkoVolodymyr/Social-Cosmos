import {initialStore} from "../initialState";

export const SET_USERS = "SET_USERS"

export const allUsersReducer = (users = initialStore.users,action) => {
  switch (action.type){
    case SET_USERS : return action?.newUsers ||  null

    default:return users
  }
}