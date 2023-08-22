import React from 'react';
import style from './Main.module.scss'

const Main = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapperMessages}>
        <div className={style.message}>
          <div>
            <p>Temchenko</p>
            <p>15 Aug</p>
            <p>14:25</p>
          </div>
          <p>Hello , i have an question</p>
        </div>
        <div className={style.message}>
          <div>
            <p>Temchenko</p>
            <p>15 Aug</p>
            <p>14:25</p>
          </div>
          <p>Hello , i have an questionasdsadsadsadasdasdsadasdsadasdasd</p>
        </div>
      </div>
      <div className={style.wrapperTextarea}>textarea</div>
    </div>
  );
};

export default Main;