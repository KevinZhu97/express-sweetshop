const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ManufacturerSchema = new Schema({
    name: {
        type: String,
        maxLength: 30
    },
    year: {
        type: Number,
        minLength: 4,
        maxLength: 4,
        required: [true, "What year was this company founded?"]
    },
    country: {
        type: String,
        maxLength: 30
    },
})

ManufacturerSchema.virtual("url").get(function () {
    return `/manufacturers/${this._id}`
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema)