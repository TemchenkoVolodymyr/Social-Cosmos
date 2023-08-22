import React from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logoutAC} from "../../Redux/Auth/AuthAC";
import {editUser} from "../../ApiFeatures/ApiFeatures";

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutAC())
    editUser(false,currentUser.id)
  }
  return (
    <div className={style.container}>
      <div>LOGO IMAGE</div>
      <h1>SOCIAL COSMOS</h1>
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default Header;