import React, {useEffect, useState} from 'react';
import style from './Nav.module.scss'
import {RiRadioButtonLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";
import {recipientUserAC, wipeRecipientUserAC} from "../../Redux/recipientUser/recipientUserAC";
import {
  createChat,
  editUser,
  getCurrentChat,
  getCurrentChatDialog, getCurrentUserChats,
  getCurrentUserDialogs
} from "../../ApiFeatures/ApiFeatures";
import {currentChatAC} from "../../Redux/CurrentChat/currentChatAC";
import {currentChatTextAC, wipeCurrentTexts} from "../../Redux/CurrentChatTexts/currentChatTextAC";
import {AiOutlineSearch} from "react-icons/ai";
import avatar from '../../assets/default.png'
import {RxExit} from "react-icons/rx";
import {logoutAC} from "../../Redux/Auth/AuthAC";
import {deleteMe, wipeAllUsersAC} from "../../Redux/AllUsers/allUsersAC";
import {
  allChatsCurrentLoginUserAC,
  wipeAllChats
} from "../../Redux/AllChatsCurrentLoginUser/allChatsCurrentLoginUserAC";
import {FiUsers} from "react-icons/fi";
import {BsFillChatLeftDotsFill} from "react-icons/bs";


const Nav = () => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const currentUser = useSelector((state) => state.user);
  const [newFoundList, setNewFoundList] = useState(null)
  const recipientUser = useSelector((state) => state.recipientUser)

  const allChats = useSelector((state) => state.allChatsCurrentUser)

  const [showList, setShowList] = useState('users')

  const [foundMessage, setNewFoundMessage] = useState(null)
console.log(allChats)
  useEffect(() => {
    dispatch(deleteMe(currentUser.id))
  }, [])

  useEffect(() => {
    getCurrentUserChats(currentUser?.id, recipientUser?._id).then(res => {
      if (res.status === 200) {
        getCurrentChatDialog(res.data._id).then(res => console.log(res))
      }
    })
  }, [currentUser, recipientUser])

  const logout = () => {
    dispatch(logoutAC())
    dispatch(wipeAllUsersAC())
    dispatch(wipeRecipientUserAC())
    dispatch(wipeCurrentTexts())
    dispatch(wipeAllChats())
    editUser(false, currentUser.id)
  }

  const handleNewRecipientUser = (dataUser) => {
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

  const searchItem = () => users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
  const searchItemMessage = () => allChats.filter(message => message.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    if (search) {
      const foundItem = searchItem()
      const foundMessage = searchItemMessage()
      setNewFoundList(foundItem)
      setNewFoundMessage(foundMessage)
    } else {
      setNewFoundList(null)
      setNewFoundMessage(null)
    }
  }, [search])

  const showCurrentUserMessages = () => {
    setShowList('chat')
    getCurrentUserDialogs(currentUser.id).then(respons => {
      if (respons.status === 200) {
        respons.data.map(chat => {
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

  console.log(onlineUsers)
  console.log(allChats)
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={showList === 'chat' ? style.activeList : null} onClick={showCurrentUserMessages}>
          <BsFillChatLeftDotsFill></BsFillChatLeftDotsFill>Chats</h1>
        <h1 className={showList === 'users' ? style.activeList : null}
            onClick={() => setShowList('users')}><FiUsers fontSize={20}></FiUsers>Users</h1>
      </div>


      <div className={style.search}>
        <div className={style.wrapperSearch}>
          <AiOutlineSearch fontSize={30}></AiOutlineSearch>
          <input placeholder={"Search"} value={search} onChange={(e) => setSearch(e.target.value)}>
          </input>
        </div>
      </div>
      <div className={style.navDialogs}>
        {showList === 'users' ?
          newFoundList ? newFoundList?.map(user => <div className={style.containerUsers}
                                                        onClick={() => handleNewRecipientUser(user)}>
              <div className={style.wrapperAvatar}>
                <img alt={'avatar'} src={avatar}></img>
                <p className={style.name}>{user.name}</p>
              </div>
              <div className={style.wrapperName}>
                {/*<p className={style.name}>{user.name}</p>*/}
              </div>
              {onlineUsers?.find(onlineU => onlineU.userId === user._id) ?
                <RiRadioButtonLine fontSize={20} color={'green'} style={{boxShadow:'rgb(5 87 8 / 87%) 0 10px 48px 21px'}}></RiRadioButtonLine> :
                <RiRadioButtonLine fontSize={20} color={'red'} style={{boxShadow:'rgb(123 11 36) 0 10px 48px 21px'}}></RiRadioButtonLine>}
            </div>) :
            users?.map(user => user._id !== currentUser.id ?
              <div className={style.containerUsers} onClick={() => handleNewRecipientUser(user)}>
                <div className={style.wrapperAvatar}>
                  <img alt={'avatar'} src={avatar}></img>
                  <p className={style.name}>{user.name}</p>
                </div>
                <div className={style.wrapperName}>
                </div>
                {onlineUsers?.find(onlineU => onlineU.userId === user._id) ?
                  <RiRadioButtonLine fontSize={20} color={'green'} style={{boxShadow:'rgb(5 87 8 / 87%) 0 10px 48px 21px'}}></RiRadioButtonLine> :
                  <RiRadioButtonLine fontSize={20} color={'red'} style={{boxShadow:'rgb(123 11 36) 0 10px 48px 21px',background:'#4f0303'}}></RiRadioButtonLine>}
              </div> : null)
          : <div>
            {foundMessage ? foundMessage.map(item => <div className={style.containerUsers}
                                                          onClick={() => handleNewRecipientUser(item)}>
              <div className={style.wrapperAvatar} id={item.chatId}>
                <div className={style.wrapperAva}>
                  <img src={item.photo ? item.photo : avatar} alt={'avatar'}/>
                  <div>
                    {onlineUsers?.find(onlineU => onlineU.userId === item._id) ?
                      <RiRadioButtonLine fontSize={20} color={'green'} style={{boxShadow:'rgb(5 87 8 / 87%) 0 10px 48px 21px'}}></RiRadioButtonLine> :
                      <RiRadioButtonLine fontSize={20} color={'red'} style={{boxShadow:'rgb(123 11 36) 0 10px 48px 21px'}}></RiRadioButtonLine>}
                  </div>
                </div>
                <div className={style.containerText}>
                  <div className={style.wrapperText}>
                    <p className={style.name}>{item.name}</p>
                    <div className={style.wrapperTime}>
                      <p className={style.message}>{item.text}</p>
                      <div className={style.time}>
                        <p>{new Date(item.date).getHours()} :</p>
                        <p> {new Date(item.date).getMinutes()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>) : allChats?.map(chat => <div className={style.containerUsers}
                                                 onClick={() => handleNewRecipientUser(chat)}>
              <div className={style.wrapperAvatar} id={chat.chatId}>
                <div className={style.wrapperAva}>
                  <img src={chat.photo ? chat.photo : avatar} alt={'avatar'}/>
                  <div>
                    {onlineUsers?.find(onlineU => onlineU.userId === chat._id && onlineU.userId === currentUser._id) ?
                      <RiRadioButtonLine fontSize={20} color={'green'}></RiRadioButtonLine> :
                      <RiRadioButtonLine fontSize={20} color={'red'}></RiRadioButtonLine>}
                  </div>
                  <p className={`${style.name} ${style.nameComp}`}>{chat._id === currentUser.id ? chat.name : chat.anotherPerson}</p>
                </div>
                <div className={style.containerText}>
                  <div className={style.wrapperText}>
                    <div className={style.wrapperInfo}>
                      <p className={`${style.name} ${style.namePhone}`}>{chat._id === currentUser.id ? chat.name : chat.anotherPerson}</p>
                      <div className={style.time}>
                        <p>{new Date(chat.date).getHours() < 10 ? "0" + new Date(chat.date).getHours() : new Date(chat.date).getHours()} :</p>
                        <p> {new Date(chat.date).getMinutes() < 10 ? "0" + new Date(chat.date).getMinutes() : new Date(chat.date).getMinutes()}</p>
                      </div>
                    </div>
                    <div className={style.wrapperTime}>
                      <p className={style.message}>{chat.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>}
      </div>
      <div className={style.logout}>
        <div className={style.wrapperLogout}>
          <p>{currentUser.name}</p>
          <RxExit onClick={logout}></RxExit>
        </div>

      </div>

    </div>
  );
};

export default Nav;