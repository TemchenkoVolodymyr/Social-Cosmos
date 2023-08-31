import React from 'react';
import style from "./Main.module.scss";

const BurgerSection = (changeSidebar,sidebarStatus) => {
  return (
    <div onClick={changeSidebar} className={`${style.headerBurger} ${sidebarStatus ? style.active : null}`}>
      <span></span>
    </div>
  );
};

export default BurgerSection;