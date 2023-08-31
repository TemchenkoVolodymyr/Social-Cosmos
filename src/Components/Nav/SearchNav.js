import style from "./Nav.module.scss";
import {AiOutlineSearch} from "react-icons/ai";
import React from "react";

const SearchNav = ({setSearch,search}) => {
  return (
    <>
      <div className={style.search}>
        <div className={style.wrapperSearch}>
          <AiOutlineSearch fontSize={30}></AiOutlineSearch>
          <input placeholder={"Search"} value={search} onChange={(e) => setSearch(e.target.value)}>
          </input>
        </div>
      </div>
    </>
  )
}

export default SearchNav