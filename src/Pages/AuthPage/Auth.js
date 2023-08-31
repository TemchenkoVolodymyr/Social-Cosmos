import React, {useState} from 'react';
import style from './Auth.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import SignupForm from "./SignupForm/SignupForm";
import {login} from "../../ApiFeatures/ApiFeatures";
import LoginForm from "./LoginForm/LoginForm";
import bgForm1 from '../../assets/login.png'
import {authCreateUserLoginThunkCreator, authLoginThunkCreator, setUserLoginData} from "../../Redux/Auth/AuthReducer";

const Auth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginOrSignup, setLoginOrSignup] = useState('login')
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false)

  const authData = useSelector((state) => state.form)

  const signupHandler = (e) => {
    e.preventDefault()
    dispatch(authCreateUserLoginThunkCreator(authData,navigate,setErrorSignUp))

  }

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(authLoginThunkCreator(authData,navigate,setErrorLogin))

  }
  return (
    <div className={style.container} style={{backgroundImage: `url(${bgForm1})`}}>
      <div className={style.header}>
        <h1 className={style.onlineItem}>Online</h1>
        <h1 className={style.chatItem}>Chat</h1>
      </div>
      {loginOrSignup === 'login' ?
        <LoginForm errorLogin={errorLogin} changeForm={setLoginOrSignup} handleSubmit={loginHandler}></LoginForm> :
        <SignupForm errorSignup={errorSignUp} changeForm={setLoginOrSignup} handleSubmit={signupHandler}></SignupForm>}
    </div>
  );
};

export default Auth;