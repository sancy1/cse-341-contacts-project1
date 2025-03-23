const errorHandler = (error, req, res, next) => {
    let statusCode = error.status || 500;
    let message = error.message || "Internal Server Error";
  
    // Handle MongoDB Duplicate Key Error
    if (error.code === 11000) {
      statusCode = 409;
      message = "Duplicate entry detected.";
    }
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack, // Hide stack trace in production
    });
  };
  
  module.exports = errorHandler;
  