const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    image: {
        type: DataTypes.STRING, // Assuming the image path or URL is stored as a string
        allowNull: true // Change to false if image is required
      }
});

module.exports = Product;
