import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", mobileNumber: "", address: "", gender: ""
  })

  function handleChange(e) {
    setFormData((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }))
  }

  function handleSubmit(e) {
    e.preventDefault() //        refresh avvakunda
    console.log(formData)
    axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("User data inserted successfully")
          setFormData({ name: "", email: "", password: "", confirmPassword: "", mobileNumber: "", address: "", gender: "" })
        }
      })
      .catch((err) => {
        console.log("error occured while inserting the data", err)
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
          type="text"
          value={formData.name}
          name="name"
          placeholder='Enter your full name'
          onChange={handleChange}
        />
        </div>
        <div>
          <input
          type="email"
          value={formData.email}
          name="email"
          placeholder='Enter your email'
          onChange={handleChange}
        />
        </div>
        <div>
          <input
          type="password"
          value={formData.password}
          name="password"
          placeholder='Enter your password'
          onChange={handleChange}
        />
        </div>
        <div>
          <input
          type="password"
          value={formData.confirmPassword}
          name="confirmPassword"
          placeholder='Enter your confirmPassword'
          onChange={handleChange}
        />
        </div>
        <input
          type="text"
          value={formData.mobileNumber}
          name="mobileNumber"
          placeholder='Enter your mobile number'
          onChange={handleChange}
        /> <br/>
        <input
          type="text"
          value={formData.address}
          name="address"
          placeholder='Enter your address'
          onChange={handleChange}
        />
        <div>
          <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={formData.gender==="male"}
        />Male

        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={formData.gender==="female"}
        />Female
        </div>

        <button>Submit</button>
      </form>
    </div>
  )
}