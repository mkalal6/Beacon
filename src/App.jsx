import { useState } from 'react'
import  YourApp  from "./components/Login.jsx";
import './components/light-bootstrap-dashboard.css'
import './components/documentation.css'
import './components/demo.css'
import './components/App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import User from './components/UserProfile.jsx'
import TableList from './components/TableList.jsx'
import NavBar from './components/Navbar.jsx'
import CryptoChart from './components/MarketPlace.jsx'

function App() {
 
  return (
    
    <BrowserRouter>

      <NavBar />
    
      <Routes>
          <Route path='/login'elem element = {<YourApp />}></Route>
          <Route path='/dashboard' element = {<Dashboard />}></Route>
          <Route path='/profile' element = {<User />}></Route>
          <Route path='/ledger' element = {<TableList />}></Route>
          <Route path='/trends' element = {<CryptoChart />}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
