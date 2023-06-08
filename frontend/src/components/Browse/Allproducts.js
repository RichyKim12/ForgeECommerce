import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Cart from "./Cart.js";
import { QuantityPicker } from "react-qty-picker";
import ListItemButton from "@mui/material/ListItemButton";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import Cookies from 'js-cookie';

// import { doc, addDoc, collection } from "@firebase/firestore";
// import db from "../../firebase";

import db from "../../firebase";
import { collection, addDoc, Timestamp } from "@firebase/firestore";

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

export default function Allproducts(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [curvalue, setCurvalue] = useState("1");
  const [ititle, setItitle] = useState();
  const [irating, setIrating] = useState();
  const [ibrand, setIbrand] = useState();
  const [idescription, setIdescription] = useState();
  const [iprice, setIprice] = useState();
  const [iuser, setIuser] = useState();
  const [iimg, setIimg] = useState();

  const getPickerValue = (value) => {
    setCurvalue(value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = () =>{
    // Cookies.remove("cart")
    let cart = Cookies.get("cart")
    if (!cart){  //Empty cart
      if (ititle){
        const item = [{title:ititle, rating:irating, brand:ibrand, description:idescription,
                      price:iprice, image:iimg, quantity:curvalue}]
        Cookies.set("cart", JSON.stringify(item))
        // print for test
        cart = Cookies.get("cart")
        let parsedArray = JSON.parse(cart)
        console.log(parsedArray)
      }
    }
    else{ // Non-empty cart
      if (ititle){
        const item = {title:ititle, rating:irating, brand:ibrand, description:idescription,
          price:iprice, image:iimg, quantity:curvalue}
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

  // This will store cart items within local storage
  async function addEventdb() {
    setItitle(props.title);
    setIrating(props.rating);
    setIbrand(props.brand);
    setIdescription(props.description);
    setIprice(props.price);
    setIimg(props.img);
    addToCart()
    // try {
    //   const docRef = await addDoc(collection(db, "cart"), {
    //     user: iuser,
    //     title: ititle,
    //     rating: irating,
    //     img: iimg,
    //     brand: ibrand,
    //     price: iprice,
    //     description: idescription,
    //     quantity: curvalue,
    //   });

    //   console.log("document ID: ", docRef.id);
    // } catch (error) {
    //   console.error("error adding doc: ", error);
    // }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ${props.price}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <Rating
            name="half-rating-read"
            defaultValue={props.rating}
            precision={0.1}
            readOnly
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* Add to cart button */}
        <Button onClick={addEventdb} style={{ background: "white" }}>
          <Cart
            title={props.title}
            rating={props.rating}
            brand={props.brand}
            description={props.description}
            price={props.price}
            quantity={curvalue}
            user={props.user}
            img={props.thumbnail}
          />
        </Button>
        {/* <IconButton aria-label="add to favorites">
         <Cart
           title={props.title}
           rating={props.rating}
           brand={props.brand}
           description={props.description}
           price={props.price}
         />
       </IconButton> */}
        <QuantityPicker
          width=".7rem"
          value={1}
          min={1}
          onChange={getPickerValue}
        />
        {/* </ExpandMore> */}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.brand}</Typography>
          <Typography paragraph>{props.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
