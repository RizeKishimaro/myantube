import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const Login = () => {
  return(
  <Routes>
      <Route path="/" element={<Navigate to="signin"/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path="signup" element={<SignUp />}/>
  </Routes>
  )
}

export default Login
