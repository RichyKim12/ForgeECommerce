const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.post('/create-checkout-session', async (req, res) => {
    const { cartItems, totalAmount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success', // Replace with your success URL
            cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL

        });
        // res.json(303, session.url);
        res.json({ url: session.url })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
    }
});

module.exports = router;




// const express = require('express');
// const cors = require('cors');
// const app = express();
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// app.use(cors()); // Enable CORS for all routes

// app.use(express.json());

// app.post('/create-checkout-session', async (req, res) => {
//     const { cartItems, totalAmount } = req.body;

//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: cartItems.map((item) => ({
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: item.name,
//                     },
//                     unit_amount: item.price * 100,
//                 },
//                 quantity: 1,
//             })),
//             mode: 'payment',
//             success_url: 'http://localhost:3000/success', // Replace with your success URL
//             cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL

//         });
//         res.redirect(303, session.url);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
//     }
// });

// // app.listen(9000, () => {
// //     console.log('Server is running on port 9000');
// // });

// module.exports = app;
