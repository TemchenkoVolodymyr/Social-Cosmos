import React, {useEffect, useState} from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logoutAC} from "../../Redux/Auth/AuthAC";
import {editUser} from "../../ApiFeatures/ApiFeatures";
import Hamburger from "../Hamburger/Hamburger";

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user);
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const logout = () => {
    dispatch(logoutAC())
    editUser(false, currentUser.id)
  }

  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)
  return (
    <div className={style.container}>
      <div className={style.bookacket}>
        <div className={style.uncomenkad}>
          <div className={style.vemekunys}>
            {time}
          </div>
        </div>
        <span></span>
        <span></span>
      </div>
      <div className={style.logo}>
        <h1>Online Chat</h1>
      </div>
      <div className={style.btnWrapper}>
        <p>{currentUser.name.toUpperCase()}</p>
        <button className={`${style.customBtn} ${style.btn9}`} onClick={logout}>Log out</button>
      </div>
      <Hamburger users={currentUser} logout={logout}></Hamburger>
    </div>
  );
};

export default Header;