import React from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './components/Checkout/Checkout';
import Browse from './components/Browse/Browse';
import NewProduct from './components/NewProduct/NewProduct';
import NavigationBar from './components/Navigation/NavigationBar';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
      <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App