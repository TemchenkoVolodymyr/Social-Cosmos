import {DELETE_ME, SET_USERS} from "./allUsersReducer";


export const allUsersAC = (newUsers) => {
  return{
    type:SET_USERS,
    newUsers
  }
}

export const deleteMe = (id) => {
  return{
    type:DELETE_ME,
    id
  }
}