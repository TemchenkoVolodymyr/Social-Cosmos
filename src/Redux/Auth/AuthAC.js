import {LOG_IN, LOG_OUT} from "./AuthReducer";


export const loginAC = () => {
  return{
    type:LOG_IN
  }
}
export const logoutAC = () => {
  return{
    type : LOG_OUT
  }
}