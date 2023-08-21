import React, {useState} from 'react';
import style from './Auth.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {loginAC} from "../../Redux/Auth/AuthAC";
import {useNavigate} from "react-router";
import SignupForm from "./SignupForm/SignupForm";
import {editUser, login, signup} from "../../ApiFeatures/ApiFeatures";
import LoginForm from "./LoginForm/LoginForm";
import bgForm from '../../assets/form/pexels-brady-knoll-3744162.jpg'
import {changeOnlineStatus, currentUserAC} from "../../Redux/CurrentUser/currentUserAC";


const Auth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginOrSignup, setLoginOrSignup] = useState('login')
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false)

  const authData = useSelector((state) => state.form)

  const signupHandler = (e) => {
    e.preventDefault()
    const formData = {
      name: authData.signup.values.name,
      password: authData.signup.values.password,
      confirmPassword: authData.signup.values.confirmPassword,
      email: authData.signup.values.email,
      isOnline:false
    }

    signup(formData).then(res => {
      if (res.status === 201) {
        const dataUser = {
          name: res.data.data.user.name,
          email: res.data.data.user.email,
          token: res.data.token,
          date: res.data.data.user.date,
          isOnline:res.data.data.user.inOnline,
          id: res.data.data.user._id,
        }
        dispatch(currentUserAC(dataUser))
        editUser(true,res.data.data.user._id)
        dispatch(changeOnlineStatus())
        dispatch(loginAC())

        navigate('/')
      }
    }).catch(err => {
      if (err) {
        console.log(err)
        setErrorSignUp(true)
      }
    })

  }

  const loginHandler = (e) => {
    e.preventDefault()
    const loginData = {
      email: authData.login.values.email,
      password: authData.login.values.password
    }
    login(loginData).then(res => {
      const dataUser = {
        name: res.data.data.user.name,
        email: res.data.data.user.email,
        date: res.data.data.user.date,
        id: res.data.data.user._id,
        token: res.data.token,
        isOnline:res.data.data.user.inOnline
      }
      if (res.status === 200) {
        dispatch(currentUserAC(dataUser))
        editUser(true,res.data.data.user._id).then(res => console.log(res))
        dispatch(changeOnlineStatus())
        dispatch(loginAC())

        navigate('/')
      }
    })
      .catch(error => {

        if (error) {
          console.log(error)
          setErrorLogin(true)
        }
      })

  }
  return (
    <div className={style.container} style={{backgroundImage: `url(${bgForm})`}}>
      {loginOrSignup === 'login' ?
        <LoginForm errorLogin={errorLogin} changeForm={setLoginOrSignup} handleSubmit={loginHandler}></LoginForm> :
        <SignupForm errorSignup={errorSignUp} changeForm={setLoginOrSignup} handleSubmit={signupHandler}></SignupForm>}
    </div>
  );
};

export default Auth;