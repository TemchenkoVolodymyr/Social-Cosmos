import React from 'react';
import style from './Main.module.scss'
import {IoSendSharp} from "react-icons/io5";

const Main = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapperMessages}>
        <div className={style.message}>
          <div className={style.wrapper}>
            <p className={style.name}>Temchenko</p>
            <div className={style.text}>
              <p>Hello , i have an quetstion</p>
            </div>
            <p className={style.date}>14:25</p>
          </div>
        </div>
        <div className={style.message}>
          <div className={style.wrapper}>
            <p className={style.name}>Temchenko</p>
            <div className={style.text}>
              <p>Hello , i have an questionasdsadsadsadasdasdsadasdsadasdasd</p>
            </div>
            <p className={style.date}>14:25</p>
          </div>
        </div>
      </div>
      <div className={style.wrapperTextarea}>
        <textarea placeholder="Write message..." wrap="off"></textarea>
      </div>
      <div className={style.test}>
      <IoSendSharp fontSize={70}></IoSendSharp>
      </div>

    </div>
  );
};

export default Main;