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

export const login = async ({email, password}) => {
  return await axios.post('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social/login', {
    email,
    password
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const editUser = async (dataToChange, idUser) => {
  return await axios.patch(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social/${idUser}`, {
    isOnline: dataToChange
  })
}

export const getAllUsers = async () => {
  return await axios.get('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/social')
}

export const setNewMessage = async (message, idUser, author, recipientId) => {
  return await axios.post('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message', {
    message,
    idUser,
    author,
    date: new Date().toLocaleTimeString(),
    recipientId
  })
}

export const getALlMessages = async () => {
  return await axios.get('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message')
}

export const getChoseUserDialogs = async (choseUserId, currentUserId) => {
  return await axios.get(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message?recipientId=${choseUserId}&idUser=${currentUserId}`)

}

// Chat room

export const getCurrentChat = async (firstId, secondId) => {
  return await axios.get(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message/find/${firstId}/${secondId}`)
}
export const createChat = async (firstId, secondId) => {
  return await axios.post(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/message`, {
    firstId,
    secondId
  })
}

// current chat dialog

export const getCurrentChatDialog = async (chatId) => {
  return await axios.get(`https://delicious-pizza-50bbb34e6fdd.herokuapp.com/dialogs/${chatId}`)
}

export const createCurrentChatText = async (chatId, senderId, text) => {
  return await axios.post('https://delicious-pizza-50bbb34e6fdd.herokuapp.com/dialogs',{
    chatId, senderId, text
  })
}
