// route that communicates with s3 bucket, for uploads/downloads

var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require("dotenv").config();
const region = "us-east-2";

// AWS S3 credentials
AWS.config.update({ region: "us-east-2" });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
// deafult route
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET request to get all files in bucket
router.get("/list", function (req, res, next) {
  const params = {
    Bucket: "forge-swe2023-week3-ecommerce-bucket",
    Prefix: "product-images",
  };
  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(500).send("Error retrieving images");
    } else {
      // Extract the image URLs (Keys) from the response
      const imageUrls = data.Contents.map((object) => {
        return {
          url: `https://forge-swe2023-week3-ecommerce-bucket.s3.${region}.amazonaws.com/${object.Key}`,
          lastModified: object.LastModified,
          // You can include additional properties if needed
        };
      });

      res.send(imageUrls);
    }
  });
});

// GET request to get a specific URL in bucket
router.get("/get-url/:key", function (req, res, next) {
  // ensures the user passed in a key
  if (!req.params.key) {
    res.status(400).send("No key provided");
  }
  res.send(
    `https://forge-swe2023-week3-ecommerce-bucket.s3.${region}.amazonaws.com/product-images/${req.params.key}`
  );
});

// GET request to get a specific FILE in a bucket
router.get("/download/:key", function (req, res, next) {
  // ensure the user passed in a key
  if (!req.params.key) {
    res.status(400).send("No key provided");
  }
  const key = `product-images/${req.params.key}`; // Add the path prefix to the key
  const params = {
    Bucket: "forge-swe2023-week3-ecommerce-bucket",
    Key: key,
  };
  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(404).send("Image not found");
    } else {
      res.send(data.Body);
    }
  });
});

// POST request to upload a file to the bucket
router.post("/upload", upload.single('file'), function (req, res) {
  // upload the file to the bucket "forge-swe2023-week3-ecommerce-bucket" folder "product-images" with the key "key"

  // ensure that the user passed in a file
  if (!req.file) {
    res.status(400).send("No file provided");
  }
  const file = req.file;

  const fileContent = fs.readFileSync(file.path);
  const fileName = file.originalname;

  const params = {
    Bucket: "forge-swe2023-week3-ecommerce-bucket",
    Key: "product-images/" + fileName,
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(500).send("Error uploading image");
    } else {
      res.send(data);
    }
  });
});

// DELETE request to delete a file in the bucket
router.delete("/delete/:key", function (req, res, next) {
  // delete the file in the bucket "forge-swe2023-week3-ecommerce-bucket" folder "product-images" with the key "key"

  // ensure that the user passed in a key
  if (!req.params.key) {
    res.status(400).send("No key provided");
  }

  const params = {
    Bucket: "forge-swe2023-week3-ecommerce-bucket",
    Key: "product-images/" + req.params.key,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
