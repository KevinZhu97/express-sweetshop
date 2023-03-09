var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/productController')
var category_controller = require('../controllers/categoryController')
var manufacturer_controller = require('../controllers/manufacturerController')

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


module.exports = router;


//CREATE HOMEPAGE