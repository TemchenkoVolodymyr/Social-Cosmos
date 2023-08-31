import {initialStore} from "../initialState";
import axios from "axios";
import {changeOnlineStatus, currentUserAC} from "../CurrentUser/currentUserAC";
import {editUser, getAllUsers, login} from "../../ApiFeatures/ApiFeatures";
import {loginAC} from "./AuthAC";

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const authReducer = (auth = initialStore.isAuth, action) => {
  switch (action.type) {
    case LOG_IN:
      return true
    case LOG_OUT :
      return false

    default:
      return auth
  }
}

export const authCreateUserLoginThunkCreator = (data, navigate, setErrorSignUp) => {
  return async (dispatch) => {

    return await axios.post(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social`, {

      email: data.email,
      name: data.name,
      confirmPassword: data.confirmPassword,
      password: data.password,
      date: new Date().toLocaleDateString()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.status === 201) {
        const dataUser = {
          name: res.data.data.user.name,
          email: res.data.data.user.email,
          token: res.data.token,
          date: res.data.data.user.date,
          isOnline:res.data.data.user.inOnline,
          id: res.data.data.user._id,
        }
        dispatch(setUserLoginData(dataUser,navigate, res.data.data.user._id))
      }
    }).catch(err => {
      if(err) {
        console.log(err)
        setErrorSignUp(err)
      }
    })
  }
}

export const setUserLoginData = (data,navigate,idUser) => {
  return (dispatch) => {
    dispatch(currentUserAC(data))

    editUser(true,idUser).then(res => {
      if(res.status === 200) {
        getAllUsers().catch(err => console.log(err))
        dispatch(changeOnlineStatus())
        dispatch(loginAC())
        navigate('/')
      }
    })
  }
}

export const authLoginThunkCreator = (authData,navigate,setErrorLogin) => {
  return (dispatch) => {
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
        dispatch(setUserLoginData(dataUser,navigate,res.data.data.user._id))
      }
    })
      .catch(error => {

        if (error) {
          console.log(error)
          setErrorLogin(true)
        }
      })
  }
}