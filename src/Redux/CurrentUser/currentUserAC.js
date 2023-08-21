import {CHANGE_ONLINE_STATUS, SET_USER} from "./currentUserReducer";


export const currentUserAC = (data) => {
  return{
    type:SET_USER,
    userData:data
  }
}
export const changeOnlineStatus = () => {
  return{
    type:CHANGE_ONLINE_STATUS
  }
}