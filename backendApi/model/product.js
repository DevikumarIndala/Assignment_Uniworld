const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Product;
