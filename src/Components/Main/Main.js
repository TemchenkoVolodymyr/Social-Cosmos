import React, {useState} from 'react';
import style from './Main.module.scss'
import {IoSendSharp} from "react-icons/io5";
import axios from "axios";
import {getALlMessages, setNewMessage} from "../../ApiFeatures/ApiFeatures";
import {useDispatch, useSelector} from "react-redux";
import {messagesAC} from "../../Redux/Messages/messagesAC";

const Main = () => {
  const [message,setMessage] = useState("")
  const currentUser = useSelector((state) => state.user);

  const messages = useSelector((state) => state.messages)
  const dispatch = useDispatch()
  const sendNewMessage = async () => {
    if(message) {

      setNewMessage(message, currentUser.id, currentUser.name).then(res => {
        if (res.status === 200) {
          setMessage('')
          getALlMessages().then(res => dispatch(messagesAC(res.data.data.result)))
        }
      })
    }
  }

  const handleEnter = (e) => {
    if(e.key === "Enter" && message) {
      setNewMessage(message, currentUser.id, currentUser.name).then(res => {
        if (res.status === 200) {
          setMessage('')
          getALlMessages().then(res => dispatch(messagesAC(res.data.data.result)))
        }
      })
    }
  }
  return (
    <div className={style.container}>
      <div className={style.wrapperMessages}>
        {messages?.map(message => <div className={style.message}>
          <p style={currentUser.id ===message.idUser ? {background:'rgba(225, 142, 5, 0.3)'} : {background:"rgba(45, 3, 70, 0.27)"}} className={style.name}>{currentUser.id === message.idUser ? 'You' : message.author}</p>
          <div className={currentUser.id === message.idUser ? style.yourMessage : style.wrapper}>
            <div className={style.text}>
              <p>{message.message}</p>
            </div>
            <p className={style.date}>{message.date}</p>
          </div>
        </div>)}
      </div>
      <div className={style.wrapperTextarea}>
        <textarea onKeyDown={handleEnter} placeholder="Write message..." wrap="off" value={message}
                  onChange={(e) => setMessage(e.target.value)}></textarea>
      </div>
      <div className={style.test}>
      <IoSendSharp onClick={sendNewMessage} fontSize={50}></IoSendSharp>
      </div>

    </div>
  );
};

export default Main;