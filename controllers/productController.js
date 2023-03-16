const Product = require("../models/product");
const async = require("async");
const { body, validationResult } = require("express-validator");
const fs = require('fs')
var path = require('path');


// const { body, validationResult } = require("express-validator");

// Display list of all Products ***Homepage
exports.index = function (req, res, next) { //dont forget to export
  Product.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_products) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("index", {
 
        title: "Sweet Shop Homepage", 
        list_products,
      }); 
    });
};


// inventory page can be updated, this is update_product page similar
exports.product_page = function(req, res, next) {
  Product.find()
    .exec(function (err, list_products) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("product_page", {
 
        title: "Sweet Shop Products", 
        list_products,
        currentId: req.params.id
      }); 
    });
}

exports.product_update = function(req, res, next) {
  const product = new Product({
    upc: req.body.upc,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
    _id: req.params.id,
  })

  Product.findByIdAndUpdate(req.params.id, product, {}, (err, theproduct) => {
    if(err) {
      return next(error)
    }
    res.redirect('/products')
  })
}

exports.product_delete = function(req, res, next) {
  Product.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/products')
  })
}

exports.product_create_get = function(req, res, next) {
  res.render('product_create', {
    title: 'Create product'
  })
}

exports.product_create_post = [
  body("name", "Product requires name").trim().isLength({min: 5}).escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);

    // var obj = {
    //     name: req.body.name,
    //     desc: req.body.desc,
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    // }
    
    const product = new Product({
      name: req.body.name,
      upc: req.body.upc, 
      dscription: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      category: req.body.category,
      image: {
        data: fs.readFileSync(path.join(_dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      }
    })


    if(!errors.isEmpty()) {
      res.render('product_create', {
        title: 'Create product',
        product,
        errors: errors.array(),
      });
      return;
    } else {
      product.save((err)=>{
        if (err) {
          return next(err);
        }
  
        res.redirect('/products')
    })
  }
}
]

//add product gray area on click button next to last product, no, next to first better, THIS IS THROUGH PUG!

