// routes/index.js
const express = require("express");
const router = express.Router();

// Import the contact routes
const contactRoutes = require("./contact");

// Use the contact routes
router.use("/contacts", contactRoutes);

module.exports = router;