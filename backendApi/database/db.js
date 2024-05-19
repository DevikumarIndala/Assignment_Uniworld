// db.js 

// Author: Devikumar
const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('ecommerce', 'new_user', 'kumar', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Define Order model
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

// Define OrderChair model
const OrderChair = sequelize.define('OrderChair', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

// Define OrderTable model
const OrderTable = sequelize.define('OrderTable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

// Define OrderTop model
const OrderTop = sequelize.define('OrderTop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

// Define Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define relationships
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderChair, foreignKey: 'order_id' });
Order.belongsToMany(Product, { through: OrderTable, foreignKey: 'order_id' });
Order.belongsToMany(Product, { through: OrderTop, foreignKey: 'order_id' });
Product.belongsToMany(Order, { through: OrderChair, foreignKey: 'chair_id' });
Product.belongsToMany(Order, { through: OrderTable, foreignKey: 'table_id' });
Product.belongsToMany(Order, { through: OrderTop, foreignKey: 'top_id' });

// Sync all defined models with the database
sequelize.sync({ force: true }) // Note: Use { force: true } to drop existing tables
  .then(() => {
    console.log('All tables have been created successfully.');
  })
  .catch(err => {
    console.error('Error creating tables:', err);
  });

// Listen for the 'connect' event
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
