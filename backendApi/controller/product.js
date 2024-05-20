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

// Controller to add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
        
        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
        }
        
        const product = await Product.create({ name, price, category, image });
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
};
