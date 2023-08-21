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

