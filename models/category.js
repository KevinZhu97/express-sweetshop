const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        maxLength: 30
    },
    description: {
        type: String,
        maxLength: 100,
    },
})

CategorySchema.virtual("url").get(function () {
    return `/categories/${this._id}`
});

module.exports = mongoose.model("Category", CategorySchema)