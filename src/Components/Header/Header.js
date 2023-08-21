import React from 'react';
import style from './Header.module.scss'

const Header = () => {
  return (
    <div className={style.container}>
      <div>LOGO IMAGE</div>
      <h1>SOCIAL COSMOS</h1>
      <div>EXIT BUTTON</div>
    </div>
  );
};

export default Header;