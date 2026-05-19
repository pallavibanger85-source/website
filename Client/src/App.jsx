
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar.jsx'
import './App.css'
import Signup from './components/auth/Signup.jsx'
import Login from './components/auth/Login.jsx'

export default function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    
    </BrowserRouter>

  )
}