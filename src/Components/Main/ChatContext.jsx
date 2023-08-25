import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client'
import {onlineUserAC} from "../../Redux/OnlineUsers/onlineUserAC";
import {useDispatch, useSelector} from "react-redux";
import {currentChatNewTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";

const ChatContext = (props) => {
  const {user, message} = props
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const currentChat = useSelector((state) => state.currentChat)
  const currentUser = useSelector((state) => state.user);


  useEffect(() => {
    const newSocket = io('https://delicious-pizza-50bbb34e6fdd.herokuapp.com');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (socket === null) return
    socket.emit("addNewUser", user?.id)
    socket.on("getOnlineUsers", (res) => {
      dispatch(onlineUserAC(res))})
  }, [socket])


  // send message
  useEffect(() => {
    if (socket === null) return;
    const newMessageData = {
      message: message,
      chatId: currentChat?._id,
      senderId: currentUser?.id
    }
    const recipientId = currentChat?.members?.find((id) => id !== user?.id)
    socket.emit("sendMessage", {...newMessageData, recipientId})

  }, [message,currentChat,currentUser,socket]);


  useEffect(() => {
// тут тому кому я отправляю
    if (socket === null) return;
    socket.on('receive_message', (res) => {
      console.log(currentUser)
      console.log(res)
      const data = {
        text:res.message,
        chatId:res.chatId,
        createdAt:new Date(),
        senderId:res.senderId
      }
      if (currentChat?._id !== res.chatId) return;

      dispatch(currentChatNewTextAC(data))
    })
    return () => socket.off("receive_message")
  }, [socket,currentChat])

  return (
    <>
    </>
  );
};

export default ChatContext;