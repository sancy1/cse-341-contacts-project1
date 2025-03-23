// const express = require("express");
// require("express-async-errors");
// const cors = require("cors");
// const connectDB = require("./config/db/connect");
// const routes = require("./routes");
// const swaggerSetup = require("./swagger/swagger");
// const errorHandler = require("./middlewares/errorHandler");
// const cookieParser = require('cookie-parser');
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Use cookie-parser middleware
// app.use(cookieParser());

// // Middleware to parse JSON
// app.use(express.json());

// // Enable CORS for all routes
// app.use(cors());

// // Handle preflight requests for all routes
// app.options("*", cors());

// // Connect to MongoDB and Start the Server
// const startServer = async () => {
//   try {
//     await connectDB(); // Wait for MongoDB connection

//   // Routes
//   app.use("/api", routes);

//   // Swagger Documentation
//   swaggerSetup(app);

//   // Centralized error handling middleware
//   app.use(errorHandler);

//   // Run swagger-autogen when the server starts
//   if (process.env.NODE_ENV !== "production") {
//     require("swagger-autogen");
//   }


//   // Route for the root URL -----------------------------------------------------------------
//   app.get('/', (req, res) => {
//     res.json({
//       message: 'Welcome to the Contacts API!',
//       endpoints: {
//         'GET /api/contacts': 'Retrieve all contacts',
//         'GET /api/contacts/:id': 'Retrieve a single contact by ID',
//         'POST /api/contacts': 'Create a new contact',
//         'PUT /api/contacts/:id': 'Update a contact by ID',
//         'PATCH /api/contacts/:id': 'Partially update a contact by ID',
//         'DELETE /api/contacts/:id': 'Delete a contact by ID',
//       },
//       documentation: 'For detailed documentation, visit /api-docs',
//     });
//   });

//   // Start the server
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// } catch (error) {
//   console.error("Failed to start server:", error.message);
// }
// };

// // Start only after DB connection
// startServer();





















const express = require("express");
const passport = require('./config/passport');
require("express-async-errors");
const cors = require("cors");
const connectDB = require("./config/db/connect");
const routes = require("./routes");
const swaggerSetup = require("./swagger/swagger");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require('cookie-parser');
require("dotenv").config();
// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');

const app = express(); 
const PORT = process.env.PORT || 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Handle preflight requests for all routes
app.options("*", cors());

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api", routes);
// app.use("/api", authRoutes);
// app.use('/api', profileRoutes);

// Swagger Documentation
swaggerSetup(app);

// Route for the root URL
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

// Centralized error handling middleware (must be after all routes)
app.use(errorHandler);

// Connect to MongoDB and Start the Server
const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

// Start only after DB connection
startServer();