import React from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Auth from "../Pages/AuthPage/Auth";

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user)
  console.log(currentUser)
  if(!isAuth) {
    return <Auth></Auth>
  }
  return (
    <>
      <section>
        <header>HEADER</header>
        <div className={style.container}>
          <nav>
          </nav>
          <main>
            <Outlet></Outlet>
          </main>
        </div>
      </section>
    </>
  );
};

export default Layout;