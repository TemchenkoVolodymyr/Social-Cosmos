import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const ProtectRouters = ({children}) => {
  const isAuth = useSelector((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to={'/login'}></Navigate>
  } else {
    return children
  }
};

export default ProtectRouters;