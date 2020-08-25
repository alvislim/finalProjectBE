const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    name: {
        type:String,
        require: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desiredPrice: {
        type: Number,
        required: true
    },
    condolidatedPrice: [{
        date: { type: Date, default: Date.now },
        prices: { type: Number, required: true }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    recommendedProducts: [{
        prodName: { type: String, required: true },
        prodPrice: { type: Number, required: true }
    }]
});

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;