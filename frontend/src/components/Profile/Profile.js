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
} from "@mui/material";

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
        "http://localhost:9000/firestore/add-product",
        formData
      );
    } catch (error) {
      console.log(error);
    } finally {
      setOpenNewProductModal(false);
      setNewProductDescription("");
      setNewProductName("");
      setNewProductPrice(0);
      setNewProductImage(null);
      setNewProductCategory("");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // get the user's products
        const response = axios
          .get(
            `http://localhost:9000/firestore/get-products-by-creator-uid/${user.uid}`
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

  return (
    <div className="profilePage">
      <div className="profilePage-content">
        <h1 className="profilePage-content-title">
          Profile for {user.displayName}
        </h1>
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
            <FormControl fullWidth>
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
                {productCategoriesArray.map((category, index) => {
                  return (
                    <MenuItem key={index} value={category}>
                      {category}
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
            <Button onClick={() => setOpenNewProductModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleAddNewProduct()}>Add</Button>
          </DialogActions>
        </Dialog>

        <div className="profilePage-products-list">
          {products.map((product, index) => {
            return (
              <div className="profilePage-products-list-item" key={index}>
                <p className="profilePage-products-list-item-name">
                  {product.name}
                </p>
                <p className="profilePage-products-list-item-price">
                  {product.price}
                </p>
                <p className="profilePage-products-list-item-description">
                  {product.description}
                </p>
                <img src={product.image_url} alt={product.name} className="profilePage-products-list-item-img" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
