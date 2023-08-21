import {SET_USER} from "./currentUserReducer";


export const currentUserAC = (data) => {
  return{
    type:SET_USER,
    userData:data
  }
}