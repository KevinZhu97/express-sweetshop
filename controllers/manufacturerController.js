const Manufacturer = require("../models/manufacturer")
const async = require("async")

exports.manufacturer_page = function(req, res, next) {
    Manufacturer.find()
      .exec(function (err, list_manufacturers) {
        if (err) {
          return next(err);
        }
        res.render("manufacturer_page", {
          title: "Update Sweet Shop Manufacturers", 
          list_manufacturers, 
          currentId: req.params.id
        }); 
      });
}