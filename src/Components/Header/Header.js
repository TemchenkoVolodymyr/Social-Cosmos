import React from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logoutAC} from "../../Redux/Auth/AuthAC";
import {editUser} from "../../ApiFeatures/ApiFeatures";
import logo from '../../assets/logo/logo2.png'
const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutAC())
    editUser(false,currentUser.id)
  }
  return (
    <div className={style.container}>
      <div className={style.btnWrapper}>
        <p>{currentUser.name.toUpperCase()}</p>
        <button className={`${style.customBtn} ${style.btn9}`} onClick={logout}>Log out</button>
      </div>
    </div>
  );
};

export default Header;