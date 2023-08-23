import React, {useState} from 'react';
import style from './Nav.module.scss'
import {RiRadioButtonLine} from "react-icons/ri";
import {useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";

const Nav = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const [dataPerPage,setDataPerPage] = useState(7)


  const paginate = (num) => setCurrentPage(num)

  const users = useSelector((state) => state.users)

  const indexOfLastPriceItem = currentPage * dataPerPage
  const indexOfFirstPriceItem = indexOfLastPriceItem - dataPerPage

  const usersCurrentPage = users?.slice(indexOfFirstPriceItem,indexOfLastPriceItem)

  return (
    <div className={style.container}>
      <h1>Astronauts in chat</h1>
      {usersCurrentPage && usersCurrentPage.map(user => <div className={style.wrapper}>
        <p>{user.name}</p>
        {user.isOnline ? <p className={style.isOnline}> <RiRadioButtonLine color="green"></RiRadioButtonLine> Online</p>  :
          <p className={style.isOffline}> <RiRadioButtonLine color="red"></RiRadioButtonLine> Offline</p> }
        </div>
      )}
      <Pagination dataPerPage={dataPerPage} totalItems={users?.length} paginate={paginate} ></Pagination>
    </div>
  );
};

export default Nav;