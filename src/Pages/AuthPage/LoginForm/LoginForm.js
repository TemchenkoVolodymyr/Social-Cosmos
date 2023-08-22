import React, {useState} from 'react';
import {Field, reduxForm} from "redux-form";
import style from './LoginForm.module.scss'
import {NavLink} from "react-router-dom";


let LoginForm = (props) => {
  const {handleSubmit , changeForm ,errorLogin } = props
 const handleEnter = (e) => {
    if(e.key === "Enter") {
      handleSubmit()
    }
 }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div>
          <Field name="email" component="input" type="email" placeholder={'Email'} required/>
        </div>
        <div>
          <Field name="password" component="input" type="password" placeholder={'Password'} required/>
        </div>
        <div className={style.btnsWrapper}>
          <button onKeyDown={handleEnter} type="submit" className={style.active}>Sign in</button>
          <button onClick={() => changeForm('signup')}>Sign Up</button>
        </div>
        <div>
        {errorLogin ? <p className={style.errorMessage}>Incorrect email or password. Try again</p> : null}
        </div>
      </form>
    </>
  );
};
LoginForm = reduxForm({
  form: 'login',
})(LoginForm)

export default LoginForm;