import React, {useEffect} from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Auth from "../Pages/AuthPage/Auth";
import bg from '../assets/bg3.png'
import Nav from "../Components/Nav/Nav";
import {editUser, getAllUsers} from "../ApiFeatures/ApiFeatures";
import {allUsersAC} from "../Redux/AllUsers/allUsersAC";
import Header from "../Components/Header/Header";
import {logoutAC} from "../Redux/Auth/AuthAC";
import {Beforeunload} from "react-beforeunload";
import Main from "../Components/Main/Main";

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch()


  useEffect(() => {
    getAllUsers().then(res => {
      dispatch(allUsersAC(res.data.data.result))
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
              <Nav/>
            </nav>
            <main>
              <Outlet></Outlet>
              <Main/>
            </main>
          </div>
        </div>
      </section>
      </Beforeunload>
    </>
  );
};

export default Layout;