import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
const navigate =useNavigate
const {loginUser}=useContext(AuthContext)




  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData)
      .then((res) => {
        console.log(res.data.message)
        alert(res.data.message)
        // localStorage.setItem("token", res.data.token)       // to save token
        loginUser(res.data)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message)
      })

  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} placeholder=' enter email' onChange={handleChange} /><br/>
        <input type="password" name='password' value={formData.password} placeholder='enter your password' onChange={handleChange} /><br/>
        <button>Submit</button>
      </form>
    </div>
  )
}







