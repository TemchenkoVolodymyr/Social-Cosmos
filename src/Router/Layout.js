import React, {useEffect} from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Auth from "../Pages/AuthPage/Auth";
import bg from '../assets/bg3.png'
import Nav from "../Components/Nav/Nav";
import {getAllUsers} from "../ApiFeatures/ApiFeatures";
import {allUsersAC} from "../Redux/AllUsers/allUsersAC";
import Header from "../Components/Header/Header";

const Layout = () => {

  const isAuth = useSelector((state) => state.isAuth);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch()
console.log(currentUser)

  useEffect(() => {
    getAllUsers().then(res => {
      console.log(res)
      dispatch(allUsersAC(res.data.data.result))
    })
  },[])
  if (!isAuth) {
    return <Auth></Auth>
  }
  return (
    <>
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
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;