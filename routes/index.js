var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/productController')
var category_controller = require('../controllers/categoryController')
var manufacturer_controller = require('../controllers/manufacturerController')
const multer = require('multer')
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
require('dotenv/config');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '-' + Date.now()
      );
    },
  });
  const upload = multer({ storage: storage });


/* GET home page. */
router.get('/', product_controller.index)

/* GET Inventory Page */
router.get('/products', product_controller.product_page)

router.get('/categories', category_controller.category_page)

router.get('/manufacturers', manufacturer_controller.manufacturer_page)



/* Update Category*/
// .get('/categories/:id', category_controller.category_page)
router.get('/categories/:id/update', category_controller.category_page)
router.get('/manufacturers/:id/update', manufacturer_controller.manufacturer_page)
router.get('/products/:id/update', product_controller.product_page)
router.post('/products/:id/update', product_controller.product_update)

//create
router.get('/products/create', product_controller.product_create_get)
router.post('/products/create', upload.single('uploaded_file'), product_controller.product_create_post)

router.post('/products/:id/delete', product_controller.product_delete)
module.exports = router;


//CREATE HOMEPAGE