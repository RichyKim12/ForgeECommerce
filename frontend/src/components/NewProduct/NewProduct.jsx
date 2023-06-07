import React, {useState, useEffect} from 'react'
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import axios from "axios";
import "./NewProduct.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

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
const productCategoriesArray = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];
function NewProduct() {
  const [selectedImage, setSelectedImage] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [newProductCategory, setNewProductCategory] = useState("");
  const formRef = React.useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName)

      }
    });
    return unsubscribe;
  }, [user]);

  if (!user) { // Temporary fix to prevent users from selling items without an account
    return <h1> Login First :/</h1>;
  }
  const fileSelectHandler=(e)=> {
    console.log(e.target.files[0])
    setSelectedImage(e.target.files[0])  
  }



  // Does two things
  // 1. Add it to firebase backend
  const fileUploadHandler=async()=>{
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('name', itemName);
    formData.append('description', itemDescription);
    formData.append('price', itemPrice);
    formData.append("fileName", selectedImage.name)
    formData.append("creator_uid", user.uid)
    try {
      const response = await axios.post(
        "http://localhost:9000/firestore/add-product",
        formData
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if (formRef.current.reportValidity()) {
      fileUploadHandler();
    }
  }
  

  // Need to add categories drop down list
  // TODO: Fix CSS stuff later,
  // TODO: Make form unsubmittable if any fields are empty (useStates?)
  // Need to display a form that takes necessary info:
  // 1. Name
  // 2. Price
  // 3. Description
  // 4. Filter Categories if we decide to implement that
  return (
    <>
      
      <h1>Upload a New Product</h1>
      <form ref = {formRef}onSubmit={fileUploadHandler}>
      {/* Item Name */}
      <div className= "itemNameContainer">
          <Box style={{ width: "250px" }}>
            <TextField
              variant="outlined"
              name="product name"
              type="text"
              required
              label= "Product Name"
              fullWidth
              sx={{
                fieldset: { borderColor: "#000000" }
              }}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Box>
      </div>

      {/* Item Name */}
      <div className= "itemNameContainer">
          <Box style={{ width: "250px" }}>
            <TextField
              variant="outlined"
              name="product price"
              type="number"
              required
              label= "Price (USD)"
              fullWidth
              sx={{
                fieldset: { borderColor: "#000000" }
              }}
              onChange={(e) => setItemPrice(e.target.value)}
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

      {/* Category Dropdown menu */}
      <div className = "fileUploadContainer">
        <FormControl sx={{fieldset: { borderColor: "#000000" }}}>
          <Select
            value={newProductCategory}
            onChange={(e) => {setNewProductCategory(e.target.value);}}
            displayEmpty
            required
            inputProps={{name: "category", id: "category"}}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {productCategoriesArray.map((category, index) => {
              return (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
          <Button variant="contained" onClick={handleSubmit} size="large">
            Submit
          </Button>
        </ThemeProvider>
      </div>
        
      </form>
    </>






  )
}

export default NewProduct