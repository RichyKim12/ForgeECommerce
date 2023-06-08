// route that talks to the firestore

var express = require("express");
var router = express.Router();
const db = require("../firebase");
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const AWS = require("aws-sdk");
require("dotenv").config();
const region = "us-east-2";

// AWS S3 credentials
AWS.config.update({ region: "us-east-2" });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} = require("firebase/firestore");

router.get("/", function (req, res, next) {
  res.send("respond with a resource from firestore route");
});

// GET request to get all products
router.get("/get-all-products", async function (req, res, next) {
  try {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const productsList = productsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.send(productsList);
  } catch (error) {
    res.status(500).send("Error retrieving products");
  }
});

// GET request to get all products by category
router.get(
  "/get-products-by-category/:category",
  async function (req, res, next) {
    try {
      const productsRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const productsByCategory = productsList.filter(
        (product) => product.category === req.params.category
      );
      res.send(productsByCategory);
    } catch (error) {
      res.status(500).send("Error retrieving products");
    }
  }
);

// GET request to get a specific product by id
router.get("/get-product-by-id/:id", async function (req, res, next) {
  try {
    const productRef = doc(db, "products", req.params.id);
    const productSnapshot = await getDoc(productRef);
    const product = {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    };
    res.send(product);
  } catch (error) {
    res.status(500).send("Error retrieving product");
  }
});

// get request to get a specific product by name
router.get("/get-product-by-name/:name", async function (req, res, next) {
  try {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const productsList = productsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const product = productsList.find(
      (product) => product.name === req.params.name
    );
    res.send(product);
  } catch (error) {
    res.status(500).send("Error retrieving product");
  }
});

// POST request to add a new product
router.post(
  "/add-product",
  upload.single("file"),
  async function (req, res, next) {
    try {
      // gets the image from the form data
      const image = req.file;
      // gets the rest of the data from the form data
      const { name, description, price, creator_uid, fileName, category } = req.body;
      // creates upload params
      const uploadParams = {
        Bucket: "forge-swe2023-week3-ecommerce-bucket",
        Key: "product-images/" + fileName,
        Body: fs.readFileSync(image.path),
      };

      // upload to s3
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        }
        if (data) {
          console.log("Upload Success", data.Location);
        }
      });

      // add the product to the firestore
      const productsRef = collection(db, "products");
      const newProductRef = await addDoc(productsRef, {
        name: name,
        description: description,
        price: price,
        creator_uid: creator_uid,
        image_url:
          "https://forge-swe2023-week3-ecommerce-bucket.s3.us-east-2.amazonaws.com/product-images/" +
          fileName,
        category: category,
      });
      res.send("Product added with ID: " + newProductRef.id);
    } catch (error) {
      res.status(500).send("Error adding product");
    }
  }
);

// GET request to get all products by the creator uid
router.get(
  "/get-products-by-creator-uid/:uid",
  async function (req, res, next) {
    // returns an array of products made by the user
    try {
      const productsRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const productsByUser = productsList.filter(
        (product) => product.creator_uid === req.params.uid
      );
      res.send(productsByUser);
    } catch (error) {
      res.status(500).send("Error retrieving products");
    }
  }
);

// PUT request to update a product by id
router.put("/update-product-by-id/:id", async function (req, res, next) {
  try {
    const productRef = doc(db, "products", req.params.id);
    await updateDoc(productRef, req.body);
    res.send("Product updated");
  } catch (error) {
    res.status(500).send("Error updating product");
  }
});

// PUT request to update a product by name
router.put("/update-product-by-name/:name", async function (req, res, next) {
  try {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const productsList = productsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const product = productsList.find(
      (product) => product.name === req.params.name
    );
    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, req.body);
    res.send("Product updated");
  } catch (error) {
    res.status(500).send("Error updating product");
  }
});

// DELETE request to delete a product by id
router.delete("/delete-product-by-id/:id", async function (req, res, next) {
  try {
    const productRef = doc(db, "products", req.params.id);
    await deleteDoc(productRef);
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});

// DELETE request to delete a product by name
router.delete("/delete-product-by-name/:name", async function (req, res, next) {
  try {
    console.log(req.params.name);
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const productsList = productsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const product = productsList.find(
      (product) => product.name === req.params.name
    );
    console.log(product);
    // delete the document
    try {
      await deleteDoc(doc(db, "products", product.id));
    } catch (e) {
      console.log("Error deleting document", e);
    }
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});

// GET request to get all users
router.get("/get-all-users", async function (req, res, next) {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
});

// GET request to get a specific user by id
router.get("/get-user-by-id/:id", async function (req, res, next) {
  try {
    const userRef = doc(db, "users", req.params.id);
    const userSnapshot = await getDoc(userRef);
    const user = {
      id: userSnapshot.id,
      ...userSnapshot.data(),
    };
    res.send(user);
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
});

// POST request to add a new user
router.post("/add-user", async function (req, res, next) {
  // first check if the user already exists, if so, return 202 status code
  // const usersRef = collection(db, "users");
  // const usersSnapshot = await getDocs(usersRef);
  // const usersList = usersSnapshot.docs.map((doc) => {
  //     return {
  //         id: doc.id,
  //         ...doc.data(),
  //     };
  // });

  // const user = usersList.find((user) => user.uid === req.body.uid);
  // if (user) {
  //     res.status(202).send("User already exists");
  // }

  try {
    const usersRef = collection(db, "users");
    const newUserRef = await addDoc(usersRef, req.body);

    res.send(newUserRef.id);
  } catch (error) {
    res.status(500).send("Error adding user");
  }
});

// GET request to see if a user exists
router.get("/user-exists/:uid", async function (req, res, next) {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const user = usersList.find((user) => user.uid === req.params.uid);
    if (user) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
});

module.exports = router;
