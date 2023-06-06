// route that talks to the firestore

var express = require("express");
var router = express.Router();
const db = require('../firebase');

const {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
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

// GET request to get a specific product by id
router.get("/get-product-by-id/:id", async function (req, res, next) {
    try {
        const productRef = doc(db, "products", req.params.id);
        const productSnapshot = await getDoc(productRef);
        const product = {
            id: productSnapshot.id,
            ...productSnapshot.data()
        }
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
        const product = productsList.find((product) => product.name === req.params.name);
        res.send(product);
    } catch (error) {
        res.status(500).send("Error retrieving product");
    }
});

// POST request to add a new product
router.post("/add-product", async function (req, res, next) {
    try {
        const productsRef = collection(db, "products");
        const newProductRef = await addDoc(productsRef, req.body);
        res.send(newProductRef.id);
    } catch (error) {
        res.status(500).send("Error adding product");
    }
});

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
        const product = productsList.find((product) => product.name === req.params.name);
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
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const productsList = productsSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        const product = productsList.find((product) => product.name === req.params.name);
        const productRef = doc(db, "products", product.id);
        await deleteDoc(productRef);
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
            ...userSnapshot.data()
        }
        res.send(user);
    } catch (error) {
        res.status(500).send("Error retrieving user");
    }
});

// POST request to add a new user
router.post("/add-user", async function (req, res, next) {
    try {
        const usersRef = collection(db, "users");
        const newUserRef = await addDoc(usersRef, req.body);
        res.send(newUserRef.id);
    } catch (error) {
        res.status(500).send("Error adding user");
    }
});






module.exports = router;
