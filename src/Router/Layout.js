import React from 'react';
import style from './Layout.module.scss'
import {Outlet} from "react-router";

const Layout = () => {
  return (
    <>
      <section>
        <header>HEADER</header>
        <div className={style.container}>
          <nav>
            NAV
          </nav>
          <main>
            <Outlet></Outlet>
            MAIM
          </main>
        </div>
      </section>
    </>
  );
};

export default Layout;