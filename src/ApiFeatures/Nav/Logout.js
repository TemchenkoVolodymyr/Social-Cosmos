import {logoutAC} from "../../Redux/Auth/AuthAC";
import {wipeAllUsersAC} from "../../Redux/AllUsers/allUsersAC";
import {wipeRecipientUserAC} from "../../Redux/recipientUser/recipientUserAC";
import {wipeCurrentTexts} from "../../Redux/CurrentChatTexts/currentChatTextAC";
import {wipeAllChats} from "../../Redux/AllChatsCurrentLoginUser/allChatsCurrentLoginUserAC";
import {editUser} from "../ApiFeatures";

export const logoutHandlerThunkCreator = (currentUserId) => {
  return (dispatch) => {

    dispatch(logoutAC())
    dispatch(wipeAllUsersAC())
    dispatch(wipeRecipientUserAC())
    dispatch(wipeCurrentTexts())
    dispatch(wipeAllChats())
    editUser(false, currentUserId).catch(err => console.log(err))
  }
}