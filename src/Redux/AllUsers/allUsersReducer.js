import {initialStore} from "../initialState";
import axios from "axios";
import {allUsersAC} from "./allUsersAC";

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



export const getAllUsersThinkCreator =  (currentUser) => {
  return async (dispatch) => {
   return await axios.get('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social').then(res => {

     if(res.status === 200) {
       const newArray = res.data.data.result.filter(item => item?._id !== currentUser?.id)
       dispatch(allUsersAC(newArray))
     }
   })
  }
}