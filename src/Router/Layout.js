import React from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Auth from "../Pages/AuthPage/Auth";
import bg from '../assets/bg3.png'

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user)

  if (!isAuth) {
    return <Auth></Auth>
  }
  return (
    <>
      <section>
        <div className={style.wrapper} style={{backgroundImage:`url(${bg})`}}>
          <header>HEADER</header>
          <div className={style.container}>
            <nav>
            </nav>
            <main>
              <Outlet></Outlet>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;