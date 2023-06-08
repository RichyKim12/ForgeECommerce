import './ProfileProductCard.css';

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// for the popup to delete product
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
// icon for delete
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Cart from '../Browse/Cart';
import { QuantityPicker } from "react-qty-picker";
import ListItemButton from "@mui/material/ListItemButton";
// axios
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileProductCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [curvalue, setCurvalue] = useState("");
  const [expandDeletePopup, setExpandDeletePopup] = useState(false);
  const getPickerValue = (value) => {
    setCurvalue(value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteProduct = async () => {

    const response = await axios.delete(`https://week3-team4-ecommerce-backend.onrender.com/firestore/delete-product-by-name/${props.title}`)
    console.log(response);
    setExpandDeletePopup(false);
    // re-render the page
    window.location.reload();

  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ${props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.rating}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <Cart
            title={props.title}
            rating={props.rating}
            brand={props.brand}
            description={props.description}
            price={props.price}
          /> */}
        </IconButton>
        {/* <QuantityPicker
          width=".7rem"
          value={1}
          min={1}
          onChange={getPickerValue}
        /> */}
        {/* </ExpandMore> */}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* 
        Dialog popup for delete product
        */}
        <Dialog
            open={expandDeletePopup}
            onClose={() => setExpandDeletePopup(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary">
                    Are you sure you want to delete this product?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setExpandDeletePopup(false)}>Cancel</Button>
                <Button onClick={() => handleDeleteProduct()} autoFocus>
                Delete
                </Button>
            </DialogActions>
        </Dialog>
        <IconButton aria-label="delete" onClick={() => setExpandDeletePopup(true)}>
            <DeleteIcon />
        </IconButton>




      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>Method:</Typography>
          <Typography paragraph>{props.brand}</Typography> */}
          <Typography paragraph>Category: {props.category}</Typography>
          <Typography paragraph>{props.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
