import React, {useState} from 'react';
import style from './Main.module.scss'
import {IoSendSharp} from "react-icons/io5";
import {
  createCurrentChatText,
  getCurrentChatDialog,
} from "../../ApiFeatures/ApiFeatures";
import {useDispatch, useSelector} from "react-redux";
import ChatContext from "./ChatContext";
import {currentChatTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";


const Main = () => {
  const [message, setMessage] = useState("")
  const currentUser = useSelector((state) => state.user);
  const [currentMessageToSend, setCurrentMessageToSend] = useState(null)
  const dispatch = useDispatch()
  const recipientUser = useSelector((state) => state.recipientUser)
  const currentChatItems = useSelector((state) => state.currentChatTexts)

  const currentChat = useSelector((state) => state.currentChat)

  const sendNewMessage = async () => {
    if (message) {
      setCurrentMessageToSend(message)
      createCurrentChatText(currentChat._id,currentUser.id,message).then(res => {
        if(res.status === 200) {
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

  const handleEnter = (e) => {
    if (e.key === "Enter" && message) {
      setCurrentMessageToSend(message)
      createCurrentChatText(currentChat._id,currentUser._id,message).then(res => {
        if(res.status === 200) {
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
console.log(currentChatItems)
  console.log(currentUser)
  return (
    <div className={style.container}>
      {recipientUser && <div>
        <p>{recipientUser.name}</p>
        <p>date when user logout</p>
      </div>}
      <div>
        {currentChatItems && currentChatItems.map(item => {
          const date = new Date(item.createdAt)
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          return (<div className={item.senderId === currentUser.id ? style.you : style.another}>
            <p>{item.text}</p>
            <p>{formattedTime ? formattedTime : null}</p>
          </div>)
        })}
      </div>
      <div className={style.wrapperTextarea}>
        <textarea onKeyDown={handleEnter} placeholder="Write message..." wrap="off" value={message}
                  onChange={(e) => setMessage(e.target.value)}></textarea>
      </div>
      <div className={style.test}>
        <IoSendSharp onClick={sendNewMessage} fontSize={50}></IoSendSharp>
      </div>
      <ChatContext  message={currentMessageToSend} user={currentUser}></ChatContext>
    </div>
  );
};

export default Main;