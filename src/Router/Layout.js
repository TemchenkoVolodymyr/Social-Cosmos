import React, {useEffect} from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Auth from "../Pages/AuthPage/Auth";
import bg from '../assets/bg3.png'
import Nav from "../Components/Nav/Nav";
import {editUser, getALlMessages, getAllUsers} from "../ApiFeatures/ApiFeatures";
import {allUsersAC} from "../Redux/AllUsers/allUsersAC";
import Header from "../Components/Header/Header";
import {Beforeunload} from "react-beforeunload";
import Main from "../Components/Main/Main";
import {messagesAC} from "../Redux/Messages/messagesAC";
import bgMessage from '../assets/bgDialogs.png'
import test from '../assets/test.png'

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const sidebarStatus = useSelector((state) => state.sidebar)

  useEffect(() => {
    getAllUsers().then(res => {

      const newArray = res.data.data.result.filter(item => item?._id !== currentUser?.id)
      dispatch(allUsersAC(newArray))
    })
    // getALlMessages().then(res => {
    //   if(res.status === 200) {
    //     dispatch(messagesAC(res.data.data.result))
    //   }
    // })
  }, [isAuth,currentUser])

  if (!isAuth) {
    return <Auth></Auth>
  }
  return (
    <>
      <Beforeunload onBeforeunload={() => editUser(false, currentUser.id)}>

        <div className={style.wrapper} style={{backgroundImage:`url(${test})`}}>
          <nav className={sidebarStatus ? style.sidebar : null}>
            <div className={style.wrapperNav}>
              <Nav/>
            </div>
          </nav>
          <main >
            <div className={style.wrapperMain}>
              <Outlet></Outlet>

                <Main/>

            </div>
          </main>

        </div>
      </Beforeunload>
    </>
  );
};

export default Layout;