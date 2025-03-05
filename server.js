const express = require('express');
const connectDB = require('./db/connect'); 
const routes = require('./routes');
const swaggerSetup = require('./swagger/swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', routes);

// Swagger Documentation
swaggerSetup(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});