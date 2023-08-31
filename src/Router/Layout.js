import React, {useEffect} from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Auth from "../Pages/AuthPage/Auth";
import Nav from "../Components/Nav/Nav";
import {editUser} from "../ApiFeatures/ApiFeatures";
import {Beforeunload} from "react-beforeunload";
import Main from "../Components/Main/Main";
import test from '../assets/test.png'
import {getAllUsersThinkCreator} from "../Redux/AllUsers/allUsersReducer";

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch()

  const sidebarStatus = useSelector((state) => state.sidebar)

  useEffect(() => {

    dispatch(getAllUsersThinkCreator(currentUser))
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
          <main className={ sidebarStatus ? style.sidebarShow : null}>
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