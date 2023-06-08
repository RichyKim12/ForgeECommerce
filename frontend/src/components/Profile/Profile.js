import "./Profile.css";
// auth
import { auth } from "../../firebase";
// onAuthStateChanged
import { onAuthStateChanged } from "firebase/auth";
// react
import React, { useState, useEffect } from "react";
// navigation
import { useNavigate } from "react-router-dom";
import { RouteLocations } from "../../RouteLocations";
// axios
import axios from "axios";
// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Input,
  IconButton,
  Icon,
} from "@mui/material";
// log out icon from mui
import LogoutIcon from "@mui/icons-material/Logout";
// components
import ProfileProductCard from "./ProfileProductCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#606C38",
      darker: "#053e85",
    },
  },
});

const deleteTheme = createTheme({
  palette: {
      primary: {
        main: "#800000",
        darker: "#053e85",
      },
     
    },
})
export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [openNewProductModal, setOpenNewProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductCategory, setNewProductCategory] = useState("");
  const [displayErrorPopup, setDisplayErrorPopup] = useState(false);

  const handleAddNewProduct = async () => {
    const formData = new FormData();
    formData.append("file", newProductImage);
    formData.append("name", newProductName);
    formData.append("description", newProductDescription);
    formData.append("price", newProductPrice);
    formData.append("creator_uid", user.uid);
    if (newProductImage) {
      formData.append("fileName", newProductImage.name);
    }
    formData.append("category", newProductCategory);

    // ensure that all fields are filled out
    if (
      newProductName.trim() === "" ||
      newProductDescription.trim() === "" ||
      newProductPrice === 0 ||
      newProductImage === null ||
      newProductCategory === ""
    ) {
      setDisplayErrorPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://week3-team4-ecommerce-backend.onrender.com/firestore/add-product",
        formData
      );
    } catch (error) {
      console.log(error);
    } finally {
      setOpenNewProductModal(false);
      setNewProductDescription("");
      setNewProductName("");
      setNewProductPrice(0);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setUser(user);
        // get the user's products
        const response = axios
          .get(
            `https://week3-team4-ecommerce-backend.onrender.com/firestore/get-products-by-creator-uid/${user.uid}`
          )
          .then((response) => {
            console.log("response", response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        navigate(RouteLocations.login);
      }
    });
    return unsubscribe;
  }, [user, openNewProductModal]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const productCategoriesArray = {
    smartphones: "Smartphones",
    laptops: "Laptops",
    fragrances: "Fragrances",
    skincare: "Skincare",
    groceries: "Groceries",
    home_decoration: "Home Decoration",
    furniture: "Furniture",
    tops: "Tops",
    womens_dresses: "Women's Dresses",
    womens_shoes: "Women's Shoes",
    mens_shirts: "Men's Shirts",
    mens_shoes: "Men's Shoes",
    mens_watches: "Men's Watches",
    womens_watches: "Women's Watches",
    womens_bags: "Women's Bags",
    womens_jewellery: "Women's Jewelry", // american english #cringe
    sunglasses: "Sunglasses",
    automotive: "Automotive",
    motorcycle: "Motorcycle",
    lighting: "Lighting",
  };

  // cahnge

  return (
    <div className="profilePage">
      <div className="profilePage-content">
        <h1 className="profilePage-content-title">
          Profile for {user.displayName}
        </h1>
        {/* log out icon */}
        <IconButton
          onClick={() => {
            auth.signOut();
          }}>
          <LogoutIcon
            className="profilePage-content-logoutIcon"
            
          />
        </IconButton>

        <div className="profilePage-content-info">
          <p className="profilePage-content-info-text">{user.email}</p>
        </div>
      </div>
      <div className="profilePage-products">
        <div className="profilePage-products-titleWrapper">
          <h1 className="profilePage-products-title">Your Products</h1>
          <button
            className="profilePage-products-newProductButton"
            onClick={() => setOpenNewProductModal(true)}
          >
            New Product
          </button>
        </div>
        {/* error popup */}
        <Dialog
          open={displayErrorPopup}
          onClose={() => setDisplayErrorPopup(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContent id="alert-dialog-description">
              Please fill out all fields properly.
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDisplayErrorPopup(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNewProductModal}
          onClose={() => setOpenNewProductModal(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Product</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product Name"
              value={newProductName}
              type="text"
              fullWidth
              onChange={(e) => {
                setNewProductName(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price (USD)"
              type="number"
              value={newProductPrice}
              fullWidth
              onChange={(e) => {
                setNewProductPrice(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              value={newProductDescription}
              type="text"
              fullWidth
              onChange={(e) => {
                setNewProductDescription(e.target.value);
              }}
            />
            {/* dropdown for categories */}
            <FormControl fullWidth >
              <Select
                value={newProductCategory}
                onChange={(e) => {
                  setNewProductCategory(e.target.value);
                }}
                displayEmpty
                inputProps={{
                  name: "category",
                  id: "category",
                }}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {Object.keys(productCategoriesArray).map((category, index) => {
                    return (
                      <MenuItem value={category.toString().replace("_", "-")} key={index}>
                        {productCategoriesArray[category]}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <Input
              type="file"
              onChange={(e) => {
                setNewProductImage(e.target.files[0]);
              }}
            />
          </DialogContent>
          <DialogActions>
            <ThemeProvider theme = {theme}>
              <Button variant="contained" onClick={() => setOpenNewProductModal(false)}>
                Cancel
              </Button>
            </ThemeProvider>
            <ThemeProvider theme = {deleteTheme}>
              <Button variant="contained" onClick={() => handleAddNewProduct()}>Add</Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>

        <div className="profilePage-products-list">
          {products.map((product, index) => {
            return (
              <ProfileProductCard
                key={index}
                title={product.name}
                price={product.price}
                description={product.description}
                image={product.image_url}
                category={product.category}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
