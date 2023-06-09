import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

import db from "../../firebase";
import { collection, addDoc } from "@firebase/firestore";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [count, setCount] = useState(1);
  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
    }
  };
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
          {props.title ? props.title : props.name}
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
        <Button style={{ background: "white" }}>
          <Cart
            title={props.title}
            rating={props.rating}
            brand={props.brand}
            description={props.description}
            price={props.price}
            quantity={count}
            user={props.user}
            img={props.img}
          />
        </Button>
        <Button>
          <div
            className="main_div"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "50%",
            }}
          >
            <div
              className="center_div"
              style={{
                width: "25%",
                borderRadius: "5%",
                display: "flex",

                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="btn_div"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button onClick={DecNum}>
                  <Avatar>
                    <RemoveIcon />
                  </Avatar>
                </Button>
                <h2>{count}</h2>

                <Button onClick={IncNum}>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </Button>
              </div>
            </div>
          </div>
        </Button>

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
