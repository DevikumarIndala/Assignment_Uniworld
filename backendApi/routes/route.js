const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const orderController = require('../controller/order');
const productController = require('../controller/product');

// User routes
router.post('/users', userController.createUser);

// Order routes
router.post('/orders', orderController.placeOrder);

// Product routes
router.get('/products', productController.getProducts);

router.post('/products', productController.addProduct);
router.get('/orders', orderController.getAllOrders);


module.exports = router;
