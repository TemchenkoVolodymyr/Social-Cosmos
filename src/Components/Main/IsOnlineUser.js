import React from 'react';
import style from "./Main.module.scss";
import {RiRadioButtonLine} from "react-icons/ri";

const IsOnlineUser = (usersToCheck,recipientUser,currentUser) => {
  return (
   <>
     {usersToCheck?.find((online) => online.userId === recipientUser._id && online.userId === currentUser._id) ? (
       <p className={style.status}>
         <RiRadioButtonLine fontSize={15} color={"green"}></RiRadioButtonLine>
       </p>
     ) : (
       <p className={style.status}>
         <RiRadioButtonLine fontSize={15} color={"red"}></RiRadioButtonLine>
       </p>
     )}
   </>
  );
};

export default IsOnlineUser;