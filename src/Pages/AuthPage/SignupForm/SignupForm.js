import React from 'react';
import {Field, reduxForm} from "redux-form";
import style from './SignupForm.module.scss'

let SignupForm = (props) => {
  const {handleSubmit, changeForm,errorSignup} = props


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div>
          <Field name="name" component="input" type="text" placeholder={'Name'} required/>
        </div>
        <div>
          <Field name="email" component="input" type="email" placeholder={'Email'} required/>
        </div>
        <div>
          <Field name="password" component="input" type="password" placeholder={'Password'} required/>
        </div>
        <div>
          <Field name="confirmPassword" component="input" type="password" placeholder={'Confirm Password'} required/>
        </div>
        <div className={style.btnsWrapper}>
        <button type="submit" className={style.active}>Sign up</button>
        <button onClick={() => changeForm('login')}>Sign in</button>
        </div>
        <div>
          {errorSignup ? <p className={style.errorMessage}>Incorrect email or password. Try again</p> : null}
        </div>
      </form>
    </>
  )
};
SignupForm = reduxForm({
  form: 'signup',
})(SignupForm)

export default SignupForm;