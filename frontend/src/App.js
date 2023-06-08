import React from 'react'
import "./App.css";
import CartPage from './components/Checkout/cartPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from './components/Browse/Browse';
import NewProduct from './components/NewProduct/NewProduct';
import NavigationBar from './components/Navigation/NavigationBar';
import Profile from './components/Profile/Profile';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from './components/Login/Login';
import Success from './components/Success/Success';
import Cancel from './components/Cancel/Cancel';


const themeLight = createTheme({


  status: {
    danger: "#e53e3e",
  },
  palette: {
    background: {
      default: "#FEFAE0"
      
    }
  },
});


function App() {
  return (
    <div className = "App">
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <BrowserRouter>
            <NavigationBar/>
              <Routes>
                <Route path="/" element={<Browse />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<CartPage/>} />
                <Route path="/success" element={<Success/>} />
                <Route path="/cancel" element={<Cancel/>} />
              </Routes>

        </BrowserRouter>
      </ThemeProvider>

    </div>
  )
}

export default App
