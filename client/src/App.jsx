import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import Login from  './Login.jsx'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute.jsx'
import Dashboard from './Dashboard.jsx'
export default function App() {
  return (
    <div>
      
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/dashboard' element={  
          <ProtectedRoute> 
            <Dashboard/>
            </ProtectedRoute>}/>


      </Routes>
      
    </div>
  )
}










