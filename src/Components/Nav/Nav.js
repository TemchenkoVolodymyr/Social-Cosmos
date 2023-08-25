import React, {useEffect, useState} from 'react';
import style from './Nav.module.scss'
import {RiRadioButtonLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";
import {recipientUserAC} from "../../Redux/recipientUser/recipientUserAC";
import {
  createChat,
  editUser,
  getCurrentChat,
  getCurrentChatDialog,
  getCurrentUserDialogs
} from "../../ApiFeatures/ApiFeatures";

import {currentChatAC} from "../../Redux/CurrentChat/currentChatAC";
import {currentChatTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {AiOutlineSearch} from "react-icons/ai";
import avatar from '../../assets/default.png'
import {RxExit} from "react-icons/rx";
import {GiSelect} from "react-icons/gi";
import {logoutAC} from "../../Redux/Auth/AuthAC";
import {deleteMe} from "../../Redux/AllUsers/allUsersAC";


const Nav = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(7)


  const paginate = (num) => setCurrentPage(num)
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)
  const onlineUsers = useSelector((state) => state.onlineUsers);

  const indexOfLastPriceItem = currentPage * dataPerPage
  const indexOfFirstPriceItem = indexOfLastPriceItem - dataPerPage

  const usersCurrentPage = users?.slice(indexOfFirstPriceItem, indexOfLastPriceItem)
  const currentUser = useSelector((state) => state.user);

  const allChats = useSelector((state) => state.allChatsCurrentUser)
  // console.log(allChats)
  const [showList,setShowList] = useState('chat')
console.log(currentUser)
useEffect(() => {
  dispatch(deleteMe(currentUser.id))
},[])
console.log(onlineUsers)
  const logout = () => {
    console.log('h')
    dispatch(logoutAC())
    editUser(false, currentUser.id)
  }

  const handleNewRecipientUser = (dataUser) => {

    dispatch(recipientUserAC(dataUser))
    createChat(dataUser._id, currentUser.id).then(res => {
      if (res.status === 200) {

        getCurrentChat(dataUser._id, currentUser.id).then(res => {
          if (res.status === 200) {
            dispatch(currentChatAC(res.data))
            console.log(res.data)
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
  console.log(users)
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={showList === 'chat' ? style.activeList : null} onClick={() => setShowList('chat')}>Cosmos Chat {showList === 'chat' ? <GiSelect fontSize={30}></GiSelect> : null }</h1>
      <h1 className={showList === 'users' ? style.activeList : null} onClick={() => setShowList('users')}>Users {showList === 'users' ? <GiSelect fontSize={30}></GiSelect> : null}</h1>
      </div>


      <div className={style.search}>
        <div className={style.wrapperSearch}>
          <AiOutlineSearch fontSize={30}></AiOutlineSearch>
          <input placeholder={"Search"}>
          </input>
        </div>
      </div>
      <div className={style.navDialogs}>
        {  showList === 'users' ?
          users?.map(user => <div className={style.containerUsers} onClick={() => handleNewRecipientUser(user)}>
          <div className={style.wrapperAvatar}>
            <img alt={'avatar'} src={avatar}></img>
            <p className={style.name}>{user.name}</p>
          </div>
          <div className={style.wrapperName}>
            {/*<p className={style.name}>{user.name}</p>*/}
          </div>
            {onlineUsers?.find(onlineU => onlineU.userId === user._id)  ?  <RiRadioButtonLine fontSize={20} color={'green'}></RiRadioButtonLine> :  <RiRadioButtonLine fontSize={20} color={'red'}></RiRadioButtonLine>}
        </div>)
        : <div>CHAT
            {/*users?.map(user => <div className={style.containerDialogs}>*/}
            {/*  <div className={style.wrapperAvatar}>*/}
            {/*    <img alt={'avatar'} src={avatar}></img>*/}
            {/*    <RiRadioButtonLine fontSize={20} color={'green'}></RiRadioButtonLine>*/}
            {/*  </div>*/}
            {/*  <div className={style.wrapperText}>*/}
            {/*    <p className={style.name}>{user.name}</p>*/}
            {/*    <p className={style.text}>Hello , how are you ?</p>*/}
            {/*  </div>*/}
            {/*</div>)*/}
            { allChats.map(chat => <div>
              <p>Name</p>
              <p>{chat[chat.length -1]?.text} </p>
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