const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Create product (Admin Only)
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// Update product (Admin Only)
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true 
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Delete product (Admin Only)
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};
