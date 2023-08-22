import axios from "axios";

export const signup = async (data) => {
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
  })

}

export const login = async ({email,password}) => {
  return await axios.post('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social/login',{
    email,
    password
  },{
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const editUser = async (dataToChange,idUser) => {
  return await axios.patch(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social/${idUser}`,{
    isOnline:dataToChange
  })
}

export const getAllUsers = async () => {
  return await axios.get('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social')
}

export const setNewMessage = async (message,idUser,author) => {
  return await axios.post('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message',{
    message,
    idUser,
    author,
    date:new Date().toLocaleTimeString()
  })
}

export const getALlMessages = async  () => {
  return await axios.get('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message')
}

