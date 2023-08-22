import React, {useState} from "react";
import style from './Pagination.module.scss'

const Pagination = (props) => {
  const {dataPerPage, totalItems, paginate} = props
  const [currentPage, setCurrentPage] = useState(1)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / dataPerPage); i++) {
    pageNumbers.push(i)

  }

  const changeActiveNum = (number) => {
    paginate(number)
    setCurrentPage(number)
  }
  return (
    <>
      <div>
        <ul className={style.items}>
          {pageNumbers.map(num => <li className={currentPage === num ? style.active : null}
                                      onClick={() => changeActiveNum(num)} key={num}>{num}</li>)}
        </ul>
      </div>
    </>
  )
}

export default Pagination