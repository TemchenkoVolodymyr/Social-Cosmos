import React from 'react';
import style from './Nav.module.scss'
import {RiRadioButtonLine} from "react-icons/ri";
import {useSelector} from "react-redux";

const Nav = () => {


  const users = useSelector((state) => state.users)
  return (
    <div className={style.container}>
      <h1>Astronauts in chat</h1>
      {users && users.map(user => <div className={style.wrapper}>
        <p>{user.name}</p>
        {user.isOnline ? <p className={style.isOnline}> <RiRadioButtonLine color="green"></RiRadioButtonLine> Online</p>  : <p className={style.isOffline}> <RiRadioButtonLine color="red"></RiRadioButtonLine> Offline</p> }
        </div>
      )}
    </div>
  );
};

export default Nav;