const Product = require('../model/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const product = await Product.create({ name, price, category });
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};