import React from 'react';
import {createCurrentChatText, getCurrentChatDialog} from "../ApiFeatures";
import {currentChatTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";

export const dialogRequestsThunkCreator = {
  sendMessage(setMessage,currentChat,currentUser,message) {

   return (dispatch) => createCurrentChatText(currentChat._id, currentUser.id, message).then(res => {

      if (res.status === 200) {
        setMessage("")
        getCurrentChatDialog(currentChat._id).then(res => {
          if (res.status === 200) {
            dispatch(currentChatTextAC(res.data))
          }
        })
      }
    })
  }
}