import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import db from "../../firebase";
import { collection, addDoc } from "@firebase/firestore";
import CardMedia from "@mui/material/CardMedia";
import Cookies from 'js-cookie'
function Cart(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addToCart = () =>{
    // Cookies.remove("cart")
    let cart = Cookies.get("cart")
    console.log(props.title)

    if (!cart){  //Empty cart
      if (props.title){
        const item = [{title:props.title, rating:props.rating, brand:props.brand, description:props.description,
                      price:props.price, image:props.img, quantity:props.quantity}]
        Cookies.set("cart", JSON.stringify(item))
        // print for test
        cart = Cookies.get("cart")
        let parsedArray = JSON.parse(cart)
        console.log(parsedArray)
      }
    }
    else{ // Non-empty cart
      if (props.title){
        const item = {title:props.title, rating:props.rating, brand:props.brand, description:props.description,
          price:props.price, image:props.img, quantity:props.quantity}
        let parsedArray = JSON.parse(cart)
        parsedArray.push(item)
        Cookies.set("cart", JSON.stringify(parsedArray))
        // print for tests
        cart = Cookies.get("cart")
        parsedArray = JSON.parse(cart)
        console.log(parsedArray)
      }
    }
  }
  async function addEventdb() {
    addToCart()
    setOpen(false);
  }
  return (
    <div>
        <AddShoppingCartIcon onClick={handleClickOpen}/>
        {" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Add to Cart Confirmation"}
        </DialogTitle>
        <CardMedia
          component="img"
          height="194"
          image={props.img}
          alt={props.title}
        />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.title}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Quantity: {props.quantity}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={addEventdb}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Cart;
