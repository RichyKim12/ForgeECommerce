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

function Cart(props) {
  const [ititle, setItitle] = useState();
  const [irating, setIrating] = useState();
  const [ibrand, setIbrand] = useState();
  const [idescription, setIdescription] = useState();
  const [iprice, setIprice] = useState();
  const [iuser, setIuser] = useState();
  const [iimg, setIimg] = useState();
  const [iquantity, setIquantity] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function addEventdb() {
    setItitle(props.title);
    setIrating(props.rating);
    setIbrand(props.brand);
    setIdescription(props.description);
    setIprice(props.price);
    setIuser(props.user);
    setIimg(props.img);
    setIquantity(props.quantity);

    try {
      const docRef = await addDoc(collection(db, "cart"), {
        user: iuser,
        title: ititle,
        rating: irating,
        img: iimg,
        brand: ibrand,
        price: iprice,
        description: idescription,
        quantity: iquantity,
      });

      console.log("document ID: ", docRef.id);
    } catch (error) {
      console.error("error adding doc: ", error);
    }
    setOpen(false);
  }
  return (
    <div>
      <Button variant="" onClick={handleClickOpen}>
        <AddShoppingCartIcon />{" "}
      </Button>
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
