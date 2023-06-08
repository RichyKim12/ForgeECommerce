import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Cart(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          {" Item successfully added to your cart"}
        </DialogTitle>
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
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Cart;
