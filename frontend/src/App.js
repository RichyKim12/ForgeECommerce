import React from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CartPage from './components/cartPage';


function App() {
  return (
    <div className = "App">
      App
      <CartPage></CartPage>
    </div>
  )
}

export default App