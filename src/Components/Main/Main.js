import React from 'react';
import style from './Main.module.scss'

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
      <div className={style.wrapperTextarea}>textarea</div>
    </div>
  );
};

export default Main;