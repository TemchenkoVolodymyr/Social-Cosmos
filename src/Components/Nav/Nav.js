import React, {useState} from 'react';
import style from './Nav.module.scss'
import {RiRadioButtonLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";
import {recipientUserAC} from "../../Redux/recipientUser/recipientUserAC";
import {createChat, getChoseUserDialogs, getCurrentChat, getCurrentChatDialog} from "../../ApiFeatures/ApiFeatures";
import {messagesAC} from "../../Redux/Messages/messagesAC";
import {currentChatAC} from "../../Redux/CurrentChat/currentChatAC";
import {currentChatTextAC} from "../../Redux/CurrentChatTexts/currentChatTextAC";
import {resetMessagesAC} from "../../Redux/onlineMessages/onlineMessagesAC";

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
  const recipientUser = useSelector((state) => state.recipientUser)
  const currentUser = useSelector((state) => state.user);


  const handleNewRecipientUser = (dataUser) => {

    dispatch(recipientUserAC(dataUser))
    // dispatch(resetMessagesAC())
    createChat(dataUser._id, currentUser.id).then(res => {
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
    return (
      <div className={style.container}>
        <h1>Astronauts in chat</h1>
        {usersCurrentPage && usersCurrentPage.map(user => <div onClick={() => handleNewRecipientUser(user)}
                                                               className={style.wrapper}>
            <p>{user.name}</p>
            {onlineUsers?.some(online => online.userId === user._id) ?
              <p className={style.isOnline}><RiRadioButtonLine color="green"></RiRadioButtonLine> Online</p> :
              <p className={style.isOffline}><RiRadioButtonLine color="red"></RiRadioButtonLine> Offline</p>}
          </div>
        )}
        <Pagination dataPerPage={dataPerPage} totalItems={users?.length} paginate={paginate}></Pagination>
      </div>
    );
  };

  export default Nav;