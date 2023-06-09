# ForgeECommerce

## Table of Contents

- [Introduction](#introduction)
- [Frontend](#frontend)
- [Backend](#backend)

## Introduction 

This is a small e-commerce application created in week 3 of Forge's Launch program. The purpose of this project was to learn how to create a full stack application using various technologies. We used:

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [AWS](https://aws.amazon.com/)
- [Render](https://render.com/)

The backend application is deployed on Render [here](https://week3-team4-ecommerce-backend.onrender.com/). Due to issues with dependencies, we are not able to host the frontend on Render. However, you can view the frontend by cloning this repository and running `npm start` in the `frontend` directory.

## Frontend

### Creation

The frontend was bootstrapped using `npx create-react-app frontend`. We then installed the following dependencies:

- [Mui](https://material-ui.com/)
- [React Router](https://reactrouter.com/)
- Axios
- [Stripe](https://stripe.com/docs/stripe-js/react)
- [Firebase](https://firebase.google.com/docs/web/setup)
- Others (see `package.json`)

### File Structure

```bash
├── README.md
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── RouteLocations.js
│   ├── components
│   │   ├── Browse
│   │   ├── Cancel
│   │   ├── Checkout
│   │   ├── Login
│   │   ├── Navigation
│   │   ├── NewProduct
│   │   ├── Profile
│   │   ├── Success

```

## Backend

### Introduction

The backend was created using Node.js and Express. We used the following dependencies:

- [Stripe](https://stripe.com/docs/stripe-js/react)
- [Firebase](https://firebase.google.com/docs/web/setup)
- [AWS](https://aws.amazon.com/)
- [Cors](https://www.npmjs.com/package/cors)
- Others (see `package.json`)

### Creation

The backend was created using `npx express-generator backend`. We then installed the dependencies listed above. With some cors configuration, we were able to deploy the backend on Render. 

#### Backend Routes

| Route | Description |
| --- | --- |
| `/` | Index route |
| `/payment` | Stripe checkout |
| `/bucket` | AWS Bucket Images |
| `/firestore` | Firestore backend |

#### Index Route

Routes:

- `GET /`: Returns "Express - Welcome to Express"

#### Payment Route

- `POST /payment`: Creates a Stripe checkout session
    - Params: `cartItems` (array of objects), `totalAmount` (number)

#### Bucket Route

**Requires AWS credentials**

- `GET /`: Returns "respond with a resource"
- `GET /list`: Lists all files in folder within the bucket
- `GET /get-url/:key`: Returns a url in a bucket
    - Params: `key` (filename)
- `GET /download/:key`: Downloads a file from a bucket
    - Params: `key` (filename)
- `POST /upload`: Uploads a file to a bucket
    - Params: `file` (file)
- `DELETE /delete/:key`: Deletes a file from a bucket
    - Params: `key` (filename)

#### Firestore Route

**Requires Firebase credentials**

- `GET /`: Returns "respond with a resource"
- `GET /get-all-products`: Returns JSON of all products created by users in firestore.
- `GET /get-products-by-category/:category`: Returns JSON of all products in a category.
    - Params: `category` (string)
- `GET /get-product-by-id/:id`: Returns JSON of a product by id.
    - Params: `id` (string)
- `GET /get-product-by-name/:name`: Returns JSON of a product by name.
    - Params: `name` (string)
- `GET /get-all-users`: Returns JSON of all users in firestore.
- `GET /get-user-by-id/:id`: Returns JSON of a user by id.
    - Params: `id` (string)
- `GET /get-products-by-creator-uid`: Returns JSON of all products created by a user.
    - Params: `creator_uid` (string)
- `GET /user-exists/:uid`: Returns JSON of whether a user exists.
    - Params: `uid` (string)
- `POST /add-user`: Creates a user in firestore.
    - Params: user object that includes email, name, uid, photoUrl
- `POST /add-product`: Creates a product in firestore.
    - Params: formData (object) that includes file, name, description, price, creator_uid, image_url, category
- `PUT /update-product-by-id/:id`: Updates a product by id.
    - Params: `id` (string)
- `PUT /update-product-by-name/:name`: Updates a product by name.
    - Params: `name` (string)
- `DELETE /delete-product-by-id/:id`: Deletes a product by id.
    - Params: `id` (string)
- `DELETE /delete-product-by-name/:name`: Deletes a product by name.
    - Params: `name` (string)










