import {initialStore} from "../initialState";

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const authReducer = (auth = initialStore.isAuth, action) => {
  switch (action.type) {
    case LOG_IN:
      return true
    case LOG_OUT :
      return false


    default:
      return auth
  }
}