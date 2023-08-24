import {SET_ONLINE_USERS} from "./onlineUserReducer";

export const onlineUserAC = (users) => {
  return{
    type:SET_ONLINE_USERS,
    onlineUsers:users
  }
}