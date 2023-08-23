import React, {useState} from 'react';
import style from './Hamburger.module.scss'
import Nav from "../Nav/Nav";

const Hamburger = (props) => {
  const [isActive, setIsActive] = useState(false)
  const {logout, users} = props
  const changeActive = () => {
    setIsActive(!isActive)
  }
  return (
    <div className={`${isActive ? style.active : null}`}>
      <div className={`${style.headerBurger}`} onClick={changeActive}>
        <span></span>
      </div>
        <div className={style.menu}>
          <ul className={style.items}>
            <div className={style.btnWrapper}>
              <p>{users.name.toUpperCase()}</p>
              <button className={`${style.customBtn} ${style.btn9}`} onClick={logout}>Log out</button>
            </div>
            <div className={style.nav}>
              <Nav></Nav>
            </div>
          </ul>
        </div>

    </div>
  );
};

export default Hamburger;