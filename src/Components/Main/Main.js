import React, {useEffect, useRef, useState} from 'react';
import style from './Main.module.scss'
import {IoSendSharp} from "react-icons/io5";
import {
  createCurrentChatText,
  getCurrentChatDialog,
} from "../../ApiFeatures/ApiFeatures";
import {useDispatch, useSelector} from "react-redux";
import ChatContext from "./ChatContext";
import {currentChatTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";
import {RiRadioButtonLine} from "react-icons/ri";
import avatar from '../../assets/default.png'
import {BsEmojiSmile} from "react-icons/bs";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import {sidebarAC} from "../../Redux/Sidebar/sidebarAC";


const Main = () => {
  const [message, setMessage] = useState("")
  const currentUser = useSelector((state) => state.user);
  const [currentMessageToSend, setCurrentMessageToSend] = useState(null)
  const dispatch = useDispatch()
  const recipientUser = useSelector((state) => state.recipientUser)
  const currentChatItems = useSelector((state) => state.currentChatTexts)
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const currentChat = useSelector((state) => state.currentChat)
  const scroll = useRef()
  const [openEmoji, setOpenEmoji] = useState(false)


  const sidebarStatus = useSelector((state) => state.sidebar)

  const sendNewMessage = async () => {
    if (message && currentChat) {
      scroll.current?.scrollIntoView({behavior: "smooth"})
      setCurrentMessageToSend(message)
      createCurrentChatText(currentChat._id, currentUser.id, message).then(res => {
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

  const handleEnter = (e) => {
    if (e.key === "Enter" && message) {
      scroll.current?.scrollIntoView({behavior: "smooth"})
      setCurrentMessageToSend(message)
      createCurrentChatText(currentChat._id, currentUser.id, message).then(res => {
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

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native)
  }


  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [currentMessageToSend, scroll])

  const changeSidebar = () => {
    dispatch(sidebarAC())
  }

  return (
    <div className={style.container}>

      <div className={style.recipient}>
        <div onClick={changeSidebar} className={`${style.headerBurger} ${sidebarStatus ? style.active : null}`}>
          <span></span>
        </div>
        {recipientUser ? (
          <>
            <p
              className={style.nameRecipient}>{currentChat?.interlocutor[0] === currentUser.name ? currentChat?.interlocutor[3] : currentChat?.interlocutor[0]}</p>
            {onlineUsers?.find((online) => online.userId === recipientUser._id && online.userId === currentUser._id) ? (
              <p className={style.status}>
                <RiRadioButtonLine fontSize={15} color={"green"}></RiRadioButtonLine>

              </p>
            ) : (
              <p className={style.status}>
                <RiRadioButtonLine fontSize={15} color={"red"}></RiRadioButtonLine>

              </p>
            )}
          </>
        ) : null}
      </div>
      <div className={`${style.containerDialogs} ${style.noRecipientUser}`}>
        {recipientUser ? currentChatItems && currentChatItems.map(item => {
          const date = new Date(item.createdAt)
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          return (<div ref={scroll}
                       className={`${style.dialogsWrapper} ${item.senderId !== currentUser.id ? style.containerYou : null}`}>
            <div className={style.wrapperAvatar}>

              {item.senderId !== currentUser.id ? <img src={avatar} alt={'avatar'}/> :
                <p className={style.meAvatar}>{currentUser.name.charAt(0).toLocaleUpperCase()}</p>}
              <p className={style.time}>{formattedTime}</p>
            </div>
            <div className={`${style.wrapperText} ${item.senderId !== currentUser.id ? style.you : null}`}>
              <p>{item.text}</p>
            </div>
          </div>)
        }) : <div className={style.noRecipient}>
          <p> {sidebarStatus ? "Choose dialogs..." : "Choose some dialogs to start a conversation..."}</p></div>}
      </div>
      <div className={style.wrapperTextarea}>
        <div className={style.textarea}>
          <textarea onKeyDown={handleEnter} placeholder={"Write message ...."} value={message}
                    onChange={(e) => setMessage(e.target.value)}
          >
          </textarea>
          {openEmoji &&
            <div className={style.picker}><Picker data={data} onEmojiSelect={handleEmojiSelect}></Picker></div>}
          <BsEmojiSmile className={style.smile} onClick={() => setOpenEmoji(!openEmoji)}></BsEmojiSmile>
          <IoSendSharp onClick={sendNewMessage}></IoSendSharp>
        </div>
      </div>
      <ChatContext message={currentMessageToSend} user={currentUser}></ChatContext>
    </div>
  );
};

export default Main;