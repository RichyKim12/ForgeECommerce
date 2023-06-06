import React from 'react'
import "./App.css";
import CartPage from './components/cartPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './components/Checkout/Checkout';
import Browse from './components/Browse/Browse';
import NewProduct from './components/NewProduct/NewProduct';
import NavigationBar from './components/Navigation/NavigationBar';
import Profile from './components/Profile/Profile';


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
          <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
      

    </div>
  )
}

export default App