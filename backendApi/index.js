// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/db'); // Import database connection from db.js
const apiRoutes = require('./routes/route');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
