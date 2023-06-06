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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [openNewProductModal, setOpenNewProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);

  const handleAddNewProduct = async () => {

    try {
        const response = await axios.post("http://localhost:9000/firestore/add-product", {
            name: newProductName,
            description: newProductDescription,
            price: newProductPrice,
            creator_uid: user.uid
        })
    } catch (error) {
        console.log(error);
    } finally {
        setOpenNewProductModal(false);
        setNewProductDescription("");
        setNewProductName("");
        setNewProductPrice(0);
    }
  }

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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
