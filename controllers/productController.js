const Product = require("../models/product");
const async = require("async");
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
    .sort([["name", "ascending"]])
    .exec(function (err, list_products) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("product_page", {
 
        title: "Sweet Shop Products", 
        list_products,
      }); 
    });
}

//add product gray area on click button next to last product, no, next to first better, THIS IS THROUGH PUG!

