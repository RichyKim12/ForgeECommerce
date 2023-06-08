import React, {useState, useEffect} from 'react';
import { Grid, Typography, Button, Container, Dialog, DialogContent, DialogActions, } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loadStripe } from '@stripe/stripe-js';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';
import { styled } from "@mui/system";



const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#606C38",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

const CartPage = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    const [cartItems, setCartItems] = useState([])
    const [confirmationPopup, setConfirmationPopup] = useState(false)
    const [deleteItemName, setDeleteItemName] = useState('')
    useEffect(()=>{
        let cart = Cookies.get("cart")
        if(cart){
            setCartItems(JSON.parse(cart))
        }
    },[setCartItems])


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price*item.quantity;
        });
        return totalPrice;
    };

    
    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:9000/payment/create-checkout-session', {
                cartItems: cartItems,
                totalAmount: calculateTotalPrice(),
                
            });
            window.open(response.data.url);
            // console.log(" %s", response.url );
            // const session = response.data;

            // const { error, paymentMethod } = await stripe.createPaymentMethod({
            //     type: 'card',
            //     card: elements.getElement(CardElement),
            // });

            // if (error) {
            //     console.log(error.message);
            //     return;
            // }
            // console.log(session)
            // const confirmPayment = await stripe.confirmCardPayment(session.client_secret, {
            //     payment_method: paymentMethod.id,
            // });

            // if (confirmPayment.error) {
            //     console.log("hi3")
            //     console.log(confirmPayment.error.message);
            //     // Handle error
            // } else {
            //     console.log("hi")
            //     console.log(confirmPayment.paymentIntent);
            //     // Payment successful, proceed with order completion
            // }
        } catch (error) {
            console.log("hi")
            console.log( error.message);
            // Handle error
        }
    };

    const handleDeleteInitial = (e)=>{
        console.log(e)
        setDeleteItemName(e)
    }

    const handleDeleteFinal = () => {
        const filteredArray = cartItems.filter(item => item.title !== deleteItemName);
        console.log(filteredArray)
        Cookies.set('cart', JSON.stringify(filteredArray));
        window.location.reload()

        
    }

    return (

        
        <Container maxWidth="md" style={{ padding: '24px' }}>
            
      
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            {/* TODO: Delete Button, be able to change quantity */}
            {/* For quantity change, might use a textfield number form */}
            {cartItems.map((item,index) => (
                


                <Grid container key={index} style={{ marginBottom: '24px' }}>
                    <Dialog open={confirmationPopup}
                            onClose={() => {setConfirmationPopup(false);}}>
                        <DialogContent id="alert-dialog-description">
                            <h1> Remove from cart? </h1>
                        </DialogContent>
                        <DialogActions>
                            <ThemeProvider theme={theme}>
                            <Button variant="contained" 
                                    onClick={() => {handleDeleteFinal();
                                                    setConfirmationPopup(false);
                                                    }}
                                    size = "large"
                                    > 
                                    Remove
                            </Button>
                            </ThemeProvider>
                        </DialogActions>
                    </Dialog>
                    <Grid item xs={12} sm={3}>
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                            Quantity: {item.quantity}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body1">${item.price * item.quantity}</Typography>
                            <FaTrash 
                            color = "rgb(96, 108, 56)"
                            size='30px'
                            cursor='pointer'
                            onMouseOver={({target})=>target.style.color="rgb(188, 108, 37)"}
                            onMouseOut = {({target})=>target.style.color="rgb(96, 108, 56)"}
                            onClick={()=> { setConfirmationPopup(true);
                                            handleDeleteInitial(item.title)
                                            }}
                            />
                    </Grid>
                </Grid>
            ))}
            <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '16px' }}>
                Total Price: ${calculateTotalPrice()}
            </Typography>
            {/* <CardElement options={{ style: { base: { fontSize: '16px' } } }} /> */}
            <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleCheckout}>
                Checkout
            </Button>
        </Container>
    );
};

const CartPageWithStripe = () => {
    return (
        // <Elements stripe={stripePromise}>
            <CartPage />
        // {/* </Elements> */}
    );
};

export default CartPageWithStripe;
