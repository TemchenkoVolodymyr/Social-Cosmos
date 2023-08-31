import {recipientUserAC} from "../../Redux/recipientUser/recipientUserAC";
import {createChat, getCurrentChat, getCurrentChatDialog} from "../ApiFeatures";
import {currentChatAC} from "../../Redux/CurrentChat/currentChatAC";
import {currentChatTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";


export const recipientUserHandlerThunkCreator = (currentUser,dataUser) => {
  return (dispatch) => {
    dispatch(recipientUserAC(dataUser))

    createChat(dataUser._id, currentUser.id, dataUser.name, dataUser?.photo, dataUser._id, currentUser.name ).then(res => {

      if (res.status === 200) {
        getCurrentChat(dataUser._id, currentUser.id).then(res => {
          if (res.status === 200) {
            dispatch(currentChatAC(res.data))
            getCurrentChatDialog(res.data._id).then(res => {
              if (res.status === 200) {
                dispatch(currentChatTextAC(res.data))
              }
            })
          }
        })
      }
    })
  }
}