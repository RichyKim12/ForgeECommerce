// route that communicates with s3 bucket, for uploads/downloads

var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');

// AWS S3 credentials
AWS.config.update({region: 'us-east-2'})

const s3 = new AWS.S3({
    // accessKeyId: "AKIAZQLFMQA3ISUBLI4D",
    // secretAccessKey: "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"
})


// GET request to get all files in bucket
router.get('/', function(req, res, next) {
    // get all the files in the bucket "forge-swe2023-week3-ecommerce-bucket" folder "product-images"
    const params = {
        Bucket: "forge-swe2023-week3-ecommerce-bucket",
        Prefix: "product-images"
    };
    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            console.log(err, err.stack)
        } else {
            res.send(data.Contents)
        }
    });
});

// GET request to get a specific file in bucket
router.get('/:key', function(req, res, next) {
    // get the file in the bucket "forge-swe2023-week3-ecommerce-bucket" folder "product-images" with the key "key"
    const params = {
        Bucket: "forge-swe2023-week3-ecommerce-bucket",
        Key: req.params.key
    };
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack)
        } else {
            res.send(data.Body)
        }
    });
});

// POST request to upload a file to the bucket
router.post('/', function(req, res, next) {
    // upload the file to the bucket "forge-swe2023-week3-ecommerce-bucket" folder "product-images" with the key "key"
    const params = {
        Bucket: "forge-swe2023-week3-ecommerce-bucket",
        Key: req.body.key,
        Body: req.body.body
    };
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(err, err.stack)
        } else {
            res.send(data)
        }
    });
});

// DELETE request to delete a file in the bucket
router.delete('/:key', function(req, res, next) {
    // delete the file in the bucket "forge-swe2023-week3-ecommerce-bucket" folder "product-images" with the key "key"
    const params = {
        Bucket: "forge-swe2023-week3-ecommerce-bucket",
        Key: req.params.key
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack)
        } else {
            res.send(data)
        }
    });
});

module.exports = router;