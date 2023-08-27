import {initialStore} from "../initialState";

export const CHANGE_STATUS_SIDEBAR = "CHANGE_STATUS_SIDEBAR"
export const sidebarReducer = (sidebar = initialStore.sidebar,action) => {
  switch (action.type){
    case CHANGE_STATUS_SIDEBAR:{
     return  !sidebar
    }
    default: return sidebar
  }
}