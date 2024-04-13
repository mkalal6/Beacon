import { useState } from 'react'
import  YourApp  from "./components/Login.jsx";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile.jsx'

function App() {

  return (
    
     <BrowserRouter>
    <Routes>
    <Route path='/login' element = {<YourApp />}></Route>
    <Route path='/user' element = {<Profile />}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
