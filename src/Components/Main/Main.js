import React, {useEffect, useRef, useState} from 'react';
import style from './Main.module.scss'
import {useDispatch, useSelector} from "react-redux";
import ChatContext from "./ChatContext";
import {sidebarAC} from "../../Redux/Sidebar/sidebarAC";
import {dialogRequestsThunkCreator} from "../../ApiFeatures/MainCmponentRequest/DialogRequestsThunkCreator";
import BurgerSection from "./BurgerSection";
import IsOnlineUser from "./IsOnlineUser";
import CurrentChat from "./CurrentChat";
import TextareaSection from "./TextareaSection";


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

  const sendNewMessage = async (e) => {

    if (message && currentChat) {

      scroll.current?.scrollIntoView({behavior: "smooth"})
      setCurrentMessageToSend(message)

      dispatch(dialogRequestsThunkCreator.sendMessage(setMessage, currentChat, currentUser, message))

    } else if (e.key === 'Enter' && message) {

      scroll.current?.scrollIntoView({behavior: "smooth"})
      setCurrentMessageToSend(message)
      dispatch(dialogRequestsThunkCreator.sendMessage(setMessage, currentChat, currentUser, message))
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

        <BurgerSection changeSidebar={changeSidebar} sidebarStatus={sidebarStatus}></BurgerSection>

        {recipientUser ? (
          <>
            <p
              className={style.nameRecipient}> {currentChat?.interlocutor[0] === currentUser.name ? currentChat?.interlocutor[3] : currentChat?.interlocutor[0]}</p>

            <IsOnlineUser usersToCheck={onlineUsers} recipientUser={recipientUser}
                          currentUser={currentUser}></IsOnlineUser>
          </>
        ) : null}
      </div>

      <div className={`${style.containerDialogs} ${style.noRecipientUser}`}>
        {recipientUser ? currentChatItems && currentChatItems.map(item => <CurrentChat item={item}
                                                                                       scrollCallback={scroll}
                                                                                       currentUser={currentUser}></CurrentChat>)

          : <div className={style.noRecipient}>
            <p> {"Choose dialogs..."}</p>
          </div>}
      </div>

      <div className={style.wrapperTextarea}>
        <TextareaSection sendMessage={sendNewMessage} setMessage={setMessage}
                         message={message} openEmoji={openEmoji} handleEmojiSelect={handleEmojiSelect}
                         setOpenEmoji={setOpenEmoji}></TextareaSection>
      </div>
      <ChatContext message={currentMessageToSend} user={currentUser}></ChatContext>
    </div>
  );
};

export default Main;