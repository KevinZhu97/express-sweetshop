const Category = require("../models/category")
const async = require("async")

//same page that allows updating and viewing the different categories
exports.category_page = function(req, res, next) {
    Category.find()
      .exec(function (err, list_categories) {
        if (err) {
          return next(err);
        }
        res.render("category_page", {
          title: "Update Sweet Shop Categories", 
          list_categories,
          currentId: req.params.id,
        }); 
      });
}
