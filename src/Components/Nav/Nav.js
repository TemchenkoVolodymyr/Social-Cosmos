import React, {useEffect, useState} from 'react';
import style from './Nav.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RxExit} from "react-icons/rx";
import {deleteMe} from "../../Redux/AllUsers/allUsersAC";
import {FiUsers} from "react-icons/fi";
import {BsFillChatLeftDotsFill} from "react-icons/bs";
import {logoutHandlerThunkCreator} from "../../ApiFeatures/Nav/Logout";
import {recipientUserHandlerThunkCreator} from "../../ApiFeatures/Nav/RecipientUserHandler";
import {currentUserMessageThunkCreator} from "../../ApiFeatures/Nav/CurrentUserMessageThunkCreator";
import SearchNav from "./SearchNav";
import UsersSection from "./UsersSection/UsersSection";
import DialogsSection from "./DialogsSection/DialogsSection";


const Nav = () => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const currentUser = useSelector((state) => state.user);
  const [newFoundList, setNewFoundList] = useState(null)

  const allChats = useSelector((state) => state.allChatsCurrentUser)

  const [showList, setShowList] = useState('users')

  const [foundMessage, setNewFoundMessage] = useState(null)

  useEffect(() => {
    dispatch(deleteMe(currentUser.id))
  }, [])

  const logout = () => {
    dispatch(logoutHandlerThunkCreator(currentUser.id))
  }

  const handleNewRecipientUser = (dataUser) => {
    dispatch(recipientUserHandlerThunkCreator(currentUser, dataUser))
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
    dispatch(currentUserMessageThunkCreator(currentUser))
  }
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={showList === 'chat' ? style.activeList : null} onClick={showCurrentUserMessages}>
          <BsFillChatLeftDotsFill></BsFillChatLeftDotsFill>Chats</h1>
        <h1 className={showList === 'users' ? style.activeList : null}
            onClick={() => setShowList('users')}><FiUsers fontSize={20}></FiUsers>Users</h1>
      </div>
      <section>
        <SearchNav setSearch={setSearch} search={search}></SearchNav>
      </section>
      <div className={style.navDialogs}>

        {showList === 'users' ?
          newFoundList ? newFoundList?.map(foundUser => <UsersSection user={foundUser}
                                                                      handleNewRecipientUser={handleNewRecipientUser}
                                                                      onlineUsers={onlineUsers}></UsersSection>)
            :
            users?.map(user => user._id !== currentUser.id
              ?
              <UsersSection user={user} handleNewRecipientUser={handleNewRecipientUser}
                            onlineUsers={onlineUsers}/> : null)
          :
          <div>
            {foundMessage ? foundMessage.map(foundItem => <DialogsSection item={foundItem}
                                                                          onlineUsers={onlineUsers} currentUser={currentUser} handleNewRecipientUser={handleNewRecipientUser}></DialogsSection>)
              :
              allChats?.map(chat => <DialogsSection item={chat} onlineUsers={onlineUsers}
                                                    currentUser={currentUser} handleNewRecipientUser={handleNewRecipientUser}></DialogsSection>)}
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