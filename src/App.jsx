import { useState } from 'react'
import  YourApp  from "./components/Login.jsx";
import './components/light-bootstrap-dashboard.css'
import './components/documentation.css'
import './components/demo.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile.jsx'
import Dashboard from './components/Dashboard.jsx'


function App() {

  return (
    
    <BrowserRouter>
      <Routes>
          <Route path='/login' element = {<YourApp />}></Route>
          <Route path='/user' element = {<Profile />}></Route>
          <Route path='/dashboard' element = {<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
