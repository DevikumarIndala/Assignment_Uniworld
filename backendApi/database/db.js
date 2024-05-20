// Import Sequelize and its DataTypes
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance with your database configuration
const sequelize = new Sequelize('ecommerce', 'new_user', 'kumar', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Define the User model
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

// Define the Order model
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

// Define the Product model
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
  },
  image: {
    type: DataTypes.STRING, // Assuming the image path or URL is stored as a string
    allowNull: true // Change to false if image is required
  }
});

// Define relationships between models
User.hasMany(Order);
Order.belongsTo(User);
// Define relationships between models with cascade delete
Order.belongsToMany(Product, { through: 'OrderProduct', onDelete: 'CASCADE' }); // Many-to-many relationship
Product.belongsToMany(Order, { through: 'OrderProduct', onDelete: 'CASCADE' }); // Many-to-many relationship


// Synchronize all defined models with the database
sequelize.sync({ force: true }) // Use { force: true } to drop existing tables
  .then(async () => {
    console.log('All tables have been created successfully.');

    // Insert multiple products
    await Product.bulkCreate([
      {
        name: 'Product 1',
        price: 10.00,
        category: 'Category 1',
        image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        name: 'Product 2',
        price: 20.00,
        category: 'Category 2',
        image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        name: 'Product 3',
        price: 30.00,
        category: 'Category 1',
        image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        name: 'Product 4',
        price: 40.00,
        category: 'Category 3',
        image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        name: 'Product 5',
        price: 50.00,
        category: 'Category 2',
        image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]);

    console.log('Five products inserted successfully.');
  })
  .then(() => {
    // Listen for the 'connect' event
    sequelize.authenticate()
      .then(() => {
        console.log('Connection to the database has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  })
  .catch(err => {
    console.error('Error creating tables:', err);
  });

// Export the Sequelize instance for use in other parts of your application
module.exports = sequelize;
