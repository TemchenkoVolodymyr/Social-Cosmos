import {getCurrentChatDialog, getCurrentUserDialogs} from "../ApiFeatures";
import {allChatsCurrentLoginUserAC} from "../../Redux/AllChatsCurrentLoginUser/allChatsCurrentLoginUserAC";


export const currentUserMessageThunkCreator = (currentUser) => {
  return (dispatch) => {

    getCurrentUserDialogs(currentUser.id).then(response => {
      if (response.status === 200) {
        response.data.map(chat => {
          getCurrentChatDialog(chat._id).then(res => {
            const dataChat = {
              chatId: chat._id,
              name: chat.interlocutor[3],
              _id: chat.interlocutor[2],
              photo: chat.interlocutor[1],
              text: res.data[res.data.length - 1]?.text,
              date: res.data[res.data.length - 1]?.createdAt,
              anotherPerson: chat.interlocutor[0]
            }

            dispatch(allChatsCurrentLoginUserAC(dataChat))
          })
        })


      }
    })
  }
}