const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: "Error creating product", error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        if (products.length === 0) {
            return res.status(404).send({ message: "No products found in this category" });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products by category", error: error.message });
    }
};

// Get products that have a specific color variant
exports.getProductsByColor = async (req, res) => {
    try {
        // Use dot notation to query inside the nested 'variants' array
        const products = await Product.find({ 'variants.color': req.params.color });
        if (products.length === 0) {
            return res.status(404).send({ message: "No products found with this color variant" });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products by color", error: error.message });
    }
};