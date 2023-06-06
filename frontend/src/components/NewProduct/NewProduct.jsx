import React, {useState} from 'react'
import Button from "@mui/material/Button";
// import axios from "axios";
import "./NewProduct.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#606C38",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function NewProduct() {
  const [selectedImage, setSelectedImage] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')

  const fileSelectHandler=(e)=> {
    console.log(e.target.files[0])
    setSelectedImage(e.target.files[0])  
  }



  // Does two things
  // 1. Creates dummy product and retrieves id and all that from DummyNode API
  // 2. Add it to firebase backend
  const fileUploadHandler=(e)=>{
    console.log(selectedImage)
    console.log(itemName)
    console.log(itemDescription)
  }

  
  // TODO: Fix CSS stuff later
  // Need to display a form that takes necessary info:
  // 1. Name
  // 2. Price
  // 3. Description
  // 4. Filter Categories if we decide to implement that
  return (
    <>
      
      <h1>Upload a New Product</h1>
      <form onSubmit={fileUploadHandler}>
      {/* Item Description */}
      <div className= "itemNameContainer">
          <Box style={{ width: "250px" }}>
            <TextField
              variant="outlined"
              name="item name"
              type="text"
              required
              label= "Item Name"
              fullWidth
              sx={{
                fieldset: { borderColor: "#000000" }
              }}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Box>
        </div>

        {/* Item Description */}
        <div className = "itemDescriptionContainer">
          <Box style={{ width: "320px" }}>
            <TextField
              variant="outlined"
              name="item description"
              type="text"
              multiline
              required
              label= "Item Description"
              fullWidth
              rows = {6}

              sx={{
                fieldset: { borderColor: "#000000" }
              }}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </Box>
        </div>

        {/* File Upload */}
        <div className = "fileUploadContainer">
          <Box style={{ width: "250px" }}>
            <TextField
              variant="outlined"
              id="Spotify-email-address"
              type="file"
              required
              fullWidth
              sx={{
                fieldset: { borderColor: "#000000" }
              }}
              onChange={fileSelectHandler}
            />
          </Box>
        </div>

        <div className = "submit-button">
          <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={fileUploadHandler} size="large">
              Login
            </Button>
          </ThemeProvider>
        </div>
        
      </form>
    </>






  )
}

export default NewProduct