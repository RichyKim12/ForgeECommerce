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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Cart from "./Cart.js";
import { QuantityPicker } from "react-qty-picker";
import ListItemButton from "@mui/material/ListItemButton";
// import { doc, updateDoc } from "@firebase/firestore";
// import db from "../../firebase";

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

  const [curvalue, setCurvalue] = useState("");
  const getPickerValue = (value) => {
    setCurvalue(value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        {/* This button actually adds item to card wth quantity */}
        <IconButton aria-label="add to favorites">
          {/* Should I create the cart item and store it inside cookies? */}
          <Cart
            title={props.title}
            rating={props.rating}
            brand={props.brand}
            description={props.description}
            price={props.price}
          />
        </IconButton>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{props.brand}</Typography>
          <Typography paragraph>{props.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}