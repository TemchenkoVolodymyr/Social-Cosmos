import React from 'react';
import style from "./Main.module.scss";
import avatar from "../../assets/default.png";

const CurrentChat = (item,scrollCallback,currentUser) => {

  const date = new Date(item.createdAt)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  return (
    <div ref={scrollCallback}
         className={`${style.dialogsWrapper} ${item.senderId !== currentUser.id ? style.containerYou : null}`}>
      <div className={style.wrapperAvatar}>

        {item.senderId !== currentUser.id ? <img src={avatar} alt={'avatar'}/> :
          <p className={style.meAvatar}>{currentUser.name.charAt(0).toLocaleUpperCase()}</p>}
        <p className={style.time}>{formattedTime}</p>
      </div>
      <div className={`${style.wrapperText} ${item.senderId !== currentUser.id ? style.you : null}`}>
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default CurrentChat;