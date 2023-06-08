import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
<<<<<<< Updated upstream
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container, Grid } from "@mui/material";
import { QuantityPicker } from "react-qty-picker";

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

=======
import Cookies from 'js-cookie';
>>>>>>> Stashed changes
function Cart(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

<<<<<<< Updated upstream
=======
  const addToCart = () =>{
    // Cookies.remove("cart")
    let cart = Cookies.get("cart")
    if (!cart){  //Empty cart
      if (ititle){
        const item = [{title:ititle, rating:irating, brand:ibrand, description:idescription,
                      price:iprice, image:iimg, quantity:iquantity}]
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
          price:iprice, image:iimg, quantity:iquantity}
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
    setItitle(props.title);
    setIrating(props.rating);
    setIbrand(props.brand);
    setIdescription(props.description);
    setIprice(props.price);
    setIuser(props.user);
    setIimg(props.img);
    setIquantity(props.quantity);
    addToCart();
    
    setOpen(false);
  }
>>>>>>> Stashed changes
  return (
    <div>
      <Button variant="" onClick={handleClickOpen}>
        <AddCircleIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justify="left">
            <Grid item xs={1} sm={1} md={1} lg={3}>
              <Card sx={{ minWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image="/static/images/cards/paella.jpg"
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
              </Card>{" "}
            </Grid>
            ))
          </Grid>
        </Container>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Cart;