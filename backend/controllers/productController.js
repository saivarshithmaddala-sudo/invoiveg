const Product = require('../models/Product');

const normalizeProductPayload = (payload = {}) => {
    const rawPacketWeight = (
        payload.packetWeight ||
        payload.netWeight ||
        payload.weight ||
        payload.category ||
        ''
    );
    const packetWeight = String(rawPacketWeight).trim();

    return {
        ...payload,
        packetWeight,
        category: packetWeight || payload.category || ''
    };
};

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
        const product = await Product.create(normalizeProductPayload(req.body));
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// Update product (Admin Only)
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, normalizeProductPayload(req.body), { 
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
