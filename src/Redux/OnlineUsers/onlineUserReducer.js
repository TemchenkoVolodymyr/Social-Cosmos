import {initialStore} from "../initialState";

export const SET_ONLINE_USERS = 'SET_ONLINE_USERS'

export const onlineUsersReducer = (onlineUsers = initialStore.onlineUsers,action) => {
  switch (action.type) {
    case SET_ONLINE_USERS : {
      return action.onlineUsers
    }
    default:return onlineUsers
  }
}