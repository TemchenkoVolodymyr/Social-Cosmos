import {SET_USERS} from "./allUsersReducer";


export const allUsersAC = (newUsers) => {
  return{
    type:SET_USERS,
    newUsers
  }
}