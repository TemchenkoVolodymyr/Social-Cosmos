import React from 'react';
import style from "../Nav.module.scss";
import avatar from "../../../assets/default.png";
import {RiRadioButtonLine} from "react-icons/ri";

const DialogsSection = ({item,onlineUsers,currentUser,handleNewRecipientUser}) => {
  return (
    <div className={style.containerUsers}
         onClick={() => handleNewRecipientUser(item)}>
      <div className={style.wrapperAvatar} id={item.chatId}>
        <div className={style.wrapperAva}>
          <img src={item.photo ? item.photo : avatar} alt={'avatar'}/>
          <div>
            {onlineUsers?.find(onlineU => onlineU.userId === item._id && onlineU.userId === currentUser._id) ?
              <RiRadioButtonLine fontSize={20} color={'green'}></RiRadioButtonLine> :
              <RiRadioButtonLine fontSize={20} color={'red'}></RiRadioButtonLine>}
          </div>
          <p
            className={`${style.name} ${style.nameComp}`}>{item._id === currentUser.id ? item.name : item.anotherPerson}</p>
        </div>
        <div className={style.containerText}>
          <div className={style.wrapperText}>
            <div className={style.wrapperInfo}>
              <p
                className={`${style.name} ${style.namePhone}`}>{item._id === currentUser.id ? item.name : item.anotherPerson}</p>
              <div className={style.time}>
                <p>{new Date(item.date).getHours() < 10 ? "0" + new Date(item.date).getHours() : new Date(item.date).getHours()} :</p>
                <p> {new Date(item.date).getMinutes() < 10 ? "0" + new Date(item.date).getMinutes() : new Date(item.date).getMinutes()}</p>
              </div>
            </div>
            <div className={style.wrapperTime}>
              <p className={style.message}>{item.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogsSection;