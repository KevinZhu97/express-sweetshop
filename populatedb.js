#! /usr/bin/env node

console.log('This script populates some products, manufacturers and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://kevinzhuz:nightsaber97@cluster0.lbnglnr.mongodb.net/?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Product = require('./models/product')
const Manufacturer = require('./models/manufacturer')
const Category = require('./models/category')


const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const products = []
const manufacturers = []
const categories = []

function productCreate(name, upc, description, manufacturer, stock, price, category, cb) {
  productdetail = {name: name , upc: upc, description: description, stock: stock, price: price, manufacturer: manufacturer, category: category };
  
  const product = new Product(productdetail);
       
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New product: ' + product);
    products.push(product)
    cb(null, product) 
  }  );
}

function categoryCreate(name, description, cb) {
  const category = new Category ({ name: name, description: description });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function manufacturerCreate(name, year, country, cb) {
  manufacturerdetail = { name: name }

  if (year != false) manufacturerdetail.year = year
  if (country != false) manufacturerdetail.country = country
    
  const manufacturer = new Manufacturer(manufacturerdetail); 

  manufacturer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Manufacturer: ' + manufacturer);
    manufacturers.push(manufacturer)
    cb(null, manufacturer)
  }  );
}


function createCategoryManufacturers(cb) {
    async.series([
        function(callback) {
          manufacturerCreate('Nestle', '1866', 'Switzerland', callback);
        }, 
        function(callback) {
          manufacturerCreate('Colombina', '1918', 'Colombia', callback);
        },
        function(callback) {
          manufacturerCreate('The Coca-Cola Company', '1892', 'USA', callback);
        },
        function(callback) {
          manufacturerCreate('Mars, Incorporated', '1911', 'USA', callback);
        },
        function(callback) {
          manufacturerCreate('PepsiCo', '1965', 'USA',  callback);
        },
        function(callback) {
          manufacturerCreate('Super', '1949', 'Colombia', callback)
        },
        function(callback) {
          categoryCreate("Chocolate", "Soft and brown sweets usually made from cacao and milk", callback);
        },
        function(callback) {
          categoryCreate("Drinks", "From water and juice to carbonated drinks", callback);
        },
        function(callback) {
          categoryCreate("Candy", "Hard candy and lollipops", callback);
        },
        function(callback) {
          categoryCreate("Chips", "Baked potatos or other vegetable slices", callback)
        },
        function(callback) {
          categoryCreate("Dairy", "Milk and Cheese", callback)
        }
        ],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('Lays', '000000000001', 'Lays potato chips are cooked in healthier oils such as corn, canola and sunflower.', manufacturers[4], 120, 3.25, categories[3], callback);
        },
        function(callback) {
          productCreate('Gatorade', '000000000002', 'Gatorade is an American brand of sports-themed beverage and food products, built around its signature line of sports drinks.', manufacturers[4], 100, 17.50, categories[3], callback);
        },
        function(callback) {
          productCreate('Cheese', '000000000003', 'Semi-hard processed cheese, 52 slices, curd greater than 65% with a delicious taste and unique melt.', manufacturers[0], 250, 11.95, categories[4], callback);
        },
        function(callback) {
          productCreate('Bon Bon Bum', '000000000004', 'Lollipop with digestible gum in the interior. Comes in all varieties of flavors.', manufacturers[1], 250, 1.90, categories[2], callback);
        },
        function(callback) {
          productCreate('Coca Cola', '000000000005', 'Also known as Coke, a carbonated soft drink manufactured by the Coca-Cola Company.', manufacturers[2], 250, 7.50, categories[1], callback);
        },
        function(callback) {
          productCreate('M&M', '000000000006', 'M&Ms are multi-colored button-shaped chocolates, each of which has the letter "m" printed in lower case in white on one side.', manufacturers[3], 250, 1.00, categories[0], callback);
        },
        function(callback) {
          productCreate('Trululu Gusanos', '000000000007', 'Famous sour gummy worms to go in parties or in drinks.', manufacturers[5], 250, 1.95, categories[2], callback)
        }
        ],
        // optional callback
        cb);
}


async.series([
    createCategoryManufacturers,
    createProducts,
   
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    
    // All done, disconnect from database
    mongoose.connection.close();
});

