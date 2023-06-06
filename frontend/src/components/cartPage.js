import React from 'react';
import { Grid, Typography, Button, Container } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// const stripePromise = loadStripe('pk_test_51NG3wZFnlKIVJbpCt22Y8UkhXdv11zJuF0E8BrKdW26HSdgA0gaGZ12N0MFO3uceHjqnj14yykoX6GRRqP0lDinV00qKAWCxoE');

const CartPage = () => {
    // const stripe = useStripe();
    // const elements = useElements();

    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            price: 10,
            image: 'https://dummyimage.com/200x200',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15,
            image: 'https://dummyimage.com/200x200',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20,
            image: 'https://dummyimage.com/200x200',
        },
    ];

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price;
        });
        return totalPrice;
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:9000/payment/create-checkout-session', {
                cartItems: cartItems,
                totalAmount: calculateTotalPrice(),
            });

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
            console.log(error.message);
            // Handle error
        }
    };

    return (
        <Container maxWidth="md" style={{ padding: '24px' }}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            {cartItems.map((item) => (
                <Grid container key={item.id} style={{ marginBottom: '24px' }}>
                    <Grid item xs={12} sm={3}>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body1">${item.price}</Typography>
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
