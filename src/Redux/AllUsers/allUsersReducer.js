import {initialStore} from "../initialState";

export const SET_USERS = "SET_USERS"

export const DELETE_ME = "DELETE_ME"
export const WIPE_USERS = "WIPE_USERS"

export const allUsersReducer = (users = initialStore.users,action) => {
  switch (action.type){
    case SET_USERS : return action?.newUsers ||  null

    case DELETE_ME : {
      const index = users.indexOf(action.id)
      if(index > -1) users.splice(index,1)
      return  users
    }
    case WIPE_USERS : {
      return users = []
    }

    default:return users
  }
}