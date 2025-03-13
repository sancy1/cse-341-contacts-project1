const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const routes = require("./routes");
const swaggerSetup = require("./swagger/swagger");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Handle preflight requests for all routes
app.options("*", cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", routes);

// Swagger Documentation
swaggerSetup(app);

// Run swagger-autogen when the server starts
if (process.env.NODE_ENV !== "production") {
  require("swagger-autogen");
}


// Route for the root URL -----------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contacts API!',
    endpoints: {
      'GET /api/contacts': 'Retrieve all contacts',
      'GET /api/contacts/:id': 'Retrieve a single contact by ID',
      'POST /api/contacts': 'Create a new contact',
      'PUT /api/contacts/:id': 'Update a contact by ID',
      'PATCH /api/contacts/:id': 'Partially update a contact by ID',
      'DELETE /api/contacts/:id': 'Delete a contact by ID',
    },
    documentation: 'For detailed documentation, visit /api-docs',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
