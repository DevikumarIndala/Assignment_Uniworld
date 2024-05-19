const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Order = sequelize.define('Order', {
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Order;
