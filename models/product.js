const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    upc: {
        type: Number,
        minLength: 12,
        maxLength: 13,
        required: [true, "UPC required"]
    },
    name: {
        type: String,
        maxLength: 30
    },
    description: {
        type: String,
        maxLength: 300
    },
    manufacturer: [{type: Schema.Types.ObjectId, ref: "Manufacturer"}],
    stock: {
        type: Number,
        required: [true, "How many in stock?"]
    },
    price: {
        type: Number,
    },
    category: [{type: Schema.Types.ObjectId, ref: "Category"}],
    image: {
        data: Buffer,
        contentType: String
    }
})

// // Getter
// ProductSchema.path('price').get(function(num) {
//     return (num / 100).toFixed(2);
//   });
  
// //   // Setter
//   ProductSchema.path('price').set(function(num) {
//     return num * 100;
//   });

ProductSchema.virtual("url").get(function() {
    return `/products/${this._id}`;
})

module.exports = mongoose.model("Product", ProductSchema)