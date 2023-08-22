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

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch()


  useEffect(() => {
    getAllUsers().then(res => {
      dispatch(allUsersAC(res.data.data.result))
    })
    getALlMessages().then(res => {
      if(res.status === 200) {
        console.log('s')
        dispatch(messagesAC(res.data.data.result))
      }
    })
  },[])
  if (!isAuth) {
    return <Auth></Auth>
  }
  return (
    <>
      <Beforeunload onBeforeunload={() =>editUser(false,currentUser.id)}>
      <section>
        <div className={style.wrapper} style={{backgroundImage:`url(${bg})`}}>
          <header>
            <Header/>
          </header>
          <div className={style.container}>
            <nav>
              <div className={style.wrapperNav}>
                <Nav/>
              </div>
            </nav>
            <main>
              <div className={style.wrapperMain}>
              <Outlet></Outlet>
              <Main/>
              </div>
            </main>
          </div>
        </div>
      </section>
      </Beforeunload>
    </>
  );
};

export default Layout;