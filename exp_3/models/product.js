const mongoose = require('mongoose');

// Define the schema for a single variant (nested document)
const VariantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
});

// Define the main product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    variants: [VariantSchema] // Embed the variant schema as an array
});

module.exports = mongoose.model('Product', ProductSchema);