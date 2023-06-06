var express = require('express');
var router = express.Router();
const db = require("../firebase")
const {getDocs} = require("firebase/firestore")
const multer =  require('multer')

const upload = multer();


// Upload this to database
router.post('/', upload.single('image'), (req, res)=> {
    const {itemName, itemDescription} = req.body
    const image = req.file
    // // Test Print Statements
    console.log(image)
    console.log(itemName, itemDescription)
    
});

// router.get('/', function(req, res) {
//    
// });
module.exports = router;
