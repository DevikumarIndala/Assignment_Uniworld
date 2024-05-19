// orderController.js

const Order = require('../model/order');

// Controller function for placing an order
exports.placeOrder = async (req, res) => {
  try {
    const { amount, user_id } = req.body;
    const order = await Order.create({ amount, user_id });
    res.status(201).json({ success: true, order });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
}
};
