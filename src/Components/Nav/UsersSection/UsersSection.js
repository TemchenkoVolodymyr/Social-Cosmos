import React from 'react';
import style from "../Nav.module.scss";
import avatar from "../../../assets/default.png";
import {RiRadioButtonLine} from "react-icons/ri";

const UsersSection = ({user,onlineUsers,handleNewRecipientUser}) => {
  return (
    <div className={style.containerUsers}
         onClick={() => handleNewRecipientUser(user)}>
      <div className={style.wrapperAvatar}>
        <img alt={'avatar'} src={avatar}></img>
        <p className={style.name}>{user.name}</p>
      </div>
      <div className={style.wrapperName}>
      </div>
      {onlineUsers?.find(onlineU => onlineU.userId === user._id) ?
        <RiRadioButtonLine fontSize={20} color={'green'}
                           style={{boxShadow: 'rgb(5 87 8 / 87%) 0 10px 48px 21px'}}></RiRadioButtonLine> :
        <RiRadioButtonLine fontSize={20} color={'red'}
                           style={{boxShadow: 'rgb(123 11 36) 0 10px 48px 21px'}}></RiRadioButtonLine>}
    </div>
  );
};

export default UsersSection;