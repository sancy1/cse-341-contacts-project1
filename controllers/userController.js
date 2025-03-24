const asyncHandler = require("express-async-handler");
const {
  registerUserService,
  verifyEmailService,
  loginUserService,
  refreshAccessTokenService,
  logoutUserService,
  changePasswordService,
  deleteUserService,
  deleteAllUsersService,
  deleteSingleUserService,
  getAllUsersService,
  getSingleUserService,
  getAccountInfoService,
  updateUserRoleService,
  resendVerificationEmailService,
  getUnverifiedUsersService,
  deleteUnverifiedUsersService,
  deleteAllUsersExceptAdminService,
  forgotPasswordService,
  resetPasswordService,
  validateResetTokenService,
} = require("../services/userServices");
const { createProfile } = require("../controllers/profileController");
const { confirmPasswordMatch } = require("../validators/userValidator");


// Register User --------------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Password match
  confirmPasswordMatch(password, confirmPassword);

  const user = await registerUserService(username, email, password);

  if (!user) {
    const error = new Error("Failed to register user");
    error.statusCode = 500; 
    throw error;
  }

  await createProfile(user._id, user.username);

  res.status(201).json({
    message: "User registered successfully. Please check your email for verification.",
  });
});


// Verify Email --------------------------------------------------------------
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    const error = new Error("Token is required");
    error.statusCode = 400; 
    throw error;
  }

  const user = await verifyEmailService(token);

  if (!user) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 400; 
    throw error;
  }

  res.status(200).json({ message: "Email verified successfully" });
});


// Login User --------------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400; 
    throw error;
  }

  const { user, token, refreshToken } = await loginUserService(email, password);

  if (!user || !token || !refreshToken) {
    const error = new Error("Failed to login");
    error.statusCode = 401; 
    throw error;
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token,
    refreshToken,
  });
});


// Refresh Access Token --------------------------------------------------------------
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    const error = new Error("Refresh token is required");
    error.statusCode = 400; 
    throw error;
  }

  const { token } = await refreshAccessTokenService(refreshToken);

  if (!token) {
    const error = new Error("Failed to refresh access token");
    error.statusCode = 401; 
    throw error;
  }

  res.json({ token });
});


// Logout User --------------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    const error = new Error("Refresh token is required");
    error.statusCode = 400; 
    throw error;
  }

  await logoutUserService(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});


// Change Password --------------------------------------------------------------
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userId = req.user.userId;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    const error = new Error("All fields are required");
    error.statusCode = 400; 
    throw error;
  }

  // Password match
  confirmPasswordMatch(newPassword, confirmNewPassword);

  await changePasswordService(userId, currentPassword, newPassword);

  res.status(200).json({ message: "Password changed successfully" });
});


// Delete User --------------------------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400; 
    throw error;
  }

  await deleteUserService(userId);

  res.status(200).json({ message: "User account and all associated data deleted successfully" });
});


// Admin: Delete All Users --------------------------------------------------------------
const deleteAllUsers = asyncHandler(async (req, res) => {
  await deleteAllUsersService();

  res.status(200).json({ message: "All users deleted successfully" });
});


// Admin: Delete Single User --------------------------------------------------------------
const deleteSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400; 
    throw error;
  }

  await deleteSingleUserService(userId);

  res.status(200).json({ message: "User deleted successfully" });
});


// Admin: Get All Users --------------------------------------------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  if (!users || users.length === 0) {
    const error = new Error("No users found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  res.status(200).json(users);
});


// Admin: Get Single User --------------------------------------------------------------
const getSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400; 
    throw error;
  }

  const user = await getSingleUserService(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  res.status(200).json(user);
});


// Get Account Info --------------------------------------------------------------
const getAccountInfo = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400; 
    throw error;
  }

  const user = await getAccountInfoService(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  res.status(200).json(user);
});


// Update User Role (Admin Only) --------------------------------------------------------------
const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!userId || !role) {
    const error = new Error("User ID and role are required");
    error.statusCode = 400; 
    throw error;
  }

  await updateUserRoleService(userId, role);

  res.status(200).json({ message: "Role updated successfully" });
});


// Resend Verification Email --------------------------------------------------------------
const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400; 
    throw error;
  }

  await resendVerificationEmailService(email);

  res.status(200).json({ message: "Verification email resent successfully" });
});


// Admin: Get All Unverified Users --------------------------------------------------------------
const getUnverifiedUsers = asyncHandler(async (req, res) => {
  const users = await getUnverifiedUsersService();

  if (!users || users.length === 0) {
    const error = new Error("No unverified users found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  res.status(200).json(users);
});


// Admin: Delete Unverified Users --------------------------------------------------------------
const deleteUnverifiedUsers = asyncHandler(async (req, res) => {
  const deletedCount = await deleteUnverifiedUsersService();

  if (deletedCount === 0) {
    const error = new Error("No unverified users found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  res.status(200).json({ message: `${deletedCount} unverified users deleted successfully` });
});


// Admin: Delete All Users Except Admins --------------------------------------------------------------
const deleteAllUsersExceptAdmin = asyncHandler(async (req, res) => {
  const deletedCount = await deleteAllUsersExceptAdminService();

  let message;
  if (deletedCount > 0) {
    message = `Successfully deleted ${deletedCount} user(s) except admin.`;
  } else {
    message = "No users other than admin exist. Deleted count: 0.";
  }

  res.status(200).json({
    success: true,
    message: message,
    deletedCount: deletedCount,
  });
});


// Forgot Password --------------------------------------------------------------
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400; 
    throw error;
  }

  await forgotPasswordService(email);

  res.status(200).json({ message: "Password reset email sent" });
});


// Validate Reset Token --------------------------------------------------------------
const validateResetToken = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    const error = new Error("Token is required");
    error.statusCode = 400; 
    throw error;
  }

  const userId = await validateResetTokenService(token);

  if (!userId) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 400; 
    throw error;
  }

  res.status(200).json({
    message: "Token is valid. You can now reset your password.",
    userId,
  });
});


// Reset Password --------------------------------------------------------------
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword, confirmNewPassword, userId } = req.body;

  if (!token || !newPassword || !confirmNewPassword || !userId) {
    const error = new Error("All fields are required");
    error.statusCode = 400; 
    throw error;
  }

  // Password match
  confirmPasswordMatch(newPassword, confirmNewPassword);

  await resetPasswordService(userId, token, newPassword);

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  refreshAccessToken,
  logoutUser,
  changePassword,
  deleteUser,
  deleteAllUsers,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  getAccountInfo,
  updateUserRole,
  resendVerificationEmail,
  getUnverifiedUsers,
  deleteUnverifiedUsers,
  deleteAllUsersExceptAdmin,
  forgotPassword,
  resetPassword,
  validateResetToken,
};































// const asyncHandler = require("express-async-handler");
// const User = require("../models/User");
// const { generateToken, generateRefreshToken } = require("../middlewares/auth");
// const { sendVerificationEmail } = require("../services/emailService");
// const { sendPasswordResetEmail } = require("../services/emailService");
// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { createProfile } = require("../controllers/profileController");
// const { confirmPasswordMatch } = require("../validators/userValidator");

// // Register User -------------------------------------------------------------
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password, confirmPassword } = req.body;

//   // Check if passwords match
//   confirmPasswordMatch(password, confirmPassword);

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     const error = new Error("User already exists");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Create user without manually hashing (Mongoose will hash it)
//   const user = await User.create({ username, email, password });

//   // Generate email verification token -------------------------------------------------------------
//   const verificationToken = crypto.randomBytes(40).toString("hex");
//   user.verificationToken = verificationToken;
//   user.verificationTokenExpires = Date.now() + 3600000; // 1 hour expiry
//   await user.save();

//   // Send email verification token to user's email address ---------------------------------------------
//   await sendVerificationEmail(email, verificationToken, username);

//   // Auto-create profile for traditional signup
//   await createProfile(user._id, user.username); // profileImage is optional

//   res.status(201).json({
//     message: "User registered successfully. Please check your email for verification.",
//   });
// });

// // Verify Email -------------------------------------------------------------
// const verifyEmail = asyncHandler(async (req, res) => {
//   const { token } = req.query;

//   const user = await User.findOne({
//     verificationToken: token,
//     verificationTokenExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     const error = new Error("Invalid or expired token");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   user.isVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpires = undefined;
//   await user.save();

//   res.status(200).json({ message: "Email verified successfully" });
// });

// // Login User -------------------------------------------------------------
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email: email.trim() });

//   if (!user) {
//     const error = new Error("Invalid email or password");
//     error.statusCode = 401; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Compare passwords -------------------------------------------------------------
//   const passwordMatch = await bcrypt.compare(password.trim(), user.password);

//   if (!passwordMatch) {
//     const error = new Error("Invalid email or password");
//     error.statusCode = 401; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   if (!user.isVerified) {
//     const error = new Error("Please verify your email to login");
//     error.statusCode = 401; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Generate JWT token and Refresh Token -------------------------------------------------------------
//   const token = generateToken(user._id, user.role); // Pass the role here
//   const refreshToken = generateRefreshToken(user._id, user.role);

//   // Store refresh token in the database (or secure storage)
//   user.refreshToken = refreshToken;
//   await user.save();

//   // Set refresh token in an HTTP-only cookie
//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Ensure secure in production (Uncomment in production)
//     sameSite: "strict",
//     path: "/",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });

//   res.json({
//     _id: user._id,
//     username: user.username,
//     email: user.email,
//     role: user.role,
//     token,
//     refreshToken,
//   });
// });

// // Refresh Access Token -------------------------------------------------------------
// const refreshAccessToken = asyncHandler(async (req, res) => {
//   const { refreshToken } = req.cookies;

//   if (!refreshToken) {
//     const error = new Error("No refresh token provided");
//     error.statusCode = 401; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Verify the refresh token
//   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//   // Find the user by the decoded userId
//   const user = await User.findById(decoded.userId);

//   if (!user || user.refreshToken !== refreshToken) {
//     const error = new Error("Invalid refresh token");
//     error.statusCode = 403; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Generate a new access token
//   const newAccessToken = generateToken(user._id, user.role);

//   res.json({
//     token: newAccessToken,
//   });
// });

// // Logout User -------------------------------------------------------------
// const logoutUser = asyncHandler(async (req, res) => {
//   const { refreshToken } = req.cookies;

//   if (!refreshToken) {
//     const error = new Error("No refresh token provided");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Find the user by the refresh token and clear it
//   const user = await User.findOne({ refreshToken });

//   if (user) {
//     user.refreshToken = undefined;
//     await user.save();
//   }

//   // Clear the refresh token cookie
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Secure in production, false in development
//     sameSite: "strict",
//     path: "/", // Ensure the cookie is cleared for all routes
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// });

// // Change Password -------------------------------------------------------------
// const changePassword = asyncHandler(async (req, res) => {
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;
//   const user = await User.findById(req.user.userId);

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Check if new passwords match
//   confirmPasswordMatch(newPassword, confirmNewPassword);

//   const passwordMatch = await bcrypt.compare(currentPassword, user.password);
//   if (!passwordMatch) {
//     const error = new Error("Invalid current password");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   user.password = newPassword;
//   await user.save();

//   res.status(200).json({ message: "Password changed successfully" });
// });

// // Delete User ------------------------------------------------------------------------
// const deleteUser = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;

//   // Delete the user using deleteOne, which triggers the middleware
//   const result = await User.deleteOne({ _id: userId });

//   if (result.deletedCount === 0) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   res.status(200).json({ message: "User account and all associated data deleted successfully" });
// });

// // Admin: Delete All Users ---------------------------------------------------------------
// const deleteAllUsers = asyncHandler(async (req, res) => {
//   await User.deleteMany({});
//   res.status(200).json({ message: "All users deleted successfully" });
// });

// // Admin: Delete All Users Except Admins ---------------------------------------------------
// const deleteAllUsersExceptAdmin = asyncHandler(async (req, res) => {
//   // Find and delete all users where the role is not 'admin'
//   const deleteResult = await User.deleteMany({ role: { $ne: "admin" } });

//   // Extract the count of deleted users
//   const deletedCount = deleteResult.deletedCount;

//   // Prepare the response message based on the count
//   let message;
//   if (deletedCount > 0) {
//     message = `Successfully deleted ${deletedCount} user(s) except admin.`;
//   } else {
//     message = "No users other than admin exist. Deleted count: 0.";
//   }

//   // Send the response with the count and message
//   res.status(200).json({
//     success: true,
//     message: message,
//     deletedCount: deletedCount,
//   });
// });

// // Admin: Delete Single User --------------------------------------------------------------
// const deleteSingleUser = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const user = await User.findByIdAndDelete(userId);

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   res.status(200).json({ message: "User deleted successfully" });
// });

// // Admin: Get All Users --------------------------------------------------------------------
// const getAllUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({});
//   res.status(200).json(users);
// });

// // Admin: Get Single User ---------------------------------------------------------------------
// const getSingleUser = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const user = await User.findById(userId);

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   res.status(200).json(user);
// });

// // Get Account Info -----------------------------------------------------
// const getAccountInfo = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.userId);

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   res.status(200).json(user);
// });

// // Update User Role (Admin Only) -------------------------------------------------------------
// const updateUserRole = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const { role } = req.body;

//   // Validate the role
//   if (!["user", "admin"].includes(role)) {
//     const error = new Error("Invalid role. Role must be either 'user' or 'admin'.");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Find the user by ID
//   const user = await User.findById(userId);

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Update the role
//   user.role = role;
//   await user.save();

//   res.status(200).json({ message: "Role updated successfully" });
// });

// // Resend Verification Email -------------------------------------------------------------
// const resendVerificationEmail = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   if (user.isVerified) {
//     const error = new Error("Email is already verified");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Generate a new verification token -------------------------------------------------------------
//   const verificationToken = crypto.randomBytes(40).toString("hex");
//   user.verificationToken = verificationToken;
//   user.verificationTokenExpires = Date.now() + 3600000; // 1 hour expiry
//   await user.save();

//   // Send the verification email
//   await sendVerificationEmail(user.email, verificationToken, user.username);

//   res.status(200).json({ message: "Verification email resent successfully" });
// });

// // Admin: Get All Unverified Users -------------------------------------------------------------
// const getUnverifiedUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({ isVerified: false });
//   res.status(200).json(users);
// });

// // Admin: Delete Unverified Users -------------------------------------------------------------
// const deleteUnverifiedUsers = asyncHandler(async (req, res) => {
//   // Delete all users where isVerified is false
//   const result = await User.deleteMany({ isVerified: false });

//   if (result.deletedCount === 0) {
//     const error = new Error("No unverified users found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   res.status(200).json({ message: `${result.deletedCount} unverified users deleted successfully` });
// });

// // Forgot Password: Generate and send reset token -------------------------------------------------
// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   const resetToken = crypto.randomBytes(20).toString("hex");
//   const resetTokenExpiry = Date.now() + 3600000;

//   const hashedToken = await bcrypt.hash(resetToken, 10);

//   user.resetPasswordToken = hashedToken;
//   user.resetPasswordExpiry = resetTokenExpiry;
//   await user.save();

//   await sendPasswordResetEmail(user.email, resetToken, user.username);

//   res.status(200).json({ message: "Password reset email sent" });
// });

// // Validate Token and return user ID -------------------------------------------------------------------
// const validateResetToken = asyncHandler(async (req, res) => {
//   const { token } = req.query;

//   const user = await User.findOne({
//     resetPasswordToken: { $exists: true },
//     resetPasswordExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     const error = new Error("Invalid or expired token");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
//   if (!isTokenValid) {
//     const error = new Error("Invalid or expired token");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   res.status(200).json({
//     message: "Token is valid. You can now reset your password.",
//     userId: user._id, // Send the user's ID
//   });
// });

// // Reset Password: Update password using the token and user ID ----------------------------------------
// const resetPassword = asyncHandler(async (req, res) => {
//   const { token, newPassword, confirmNewPassword, userId } = req.body;

//   // Validate input
//   if (!token || !newPassword || !userId) {
//     const error = new Error("Token, new password, and user ID are required");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Check if new passwords match
//   confirmPasswordMatch(newPassword, confirmNewPassword);

//   // Find the user by ID and check if the reset token is still valid
//   const user = await User.findOne({
//     _id: userId,
//     resetPasswordToken: { $exists: true },
//     resetPasswordExpiry: { $gt: Date.now() }, // Check if the token is not expired
//   });

//   if (!user) {
//     const error = new Error("Invalid or expired token");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Verify the token (compare hashed token with the provided token)
//   const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
//   if (!isTokenValid) {
//     const error = new Error("Invalid or expired token");
//     error.statusCode = 400; // Set a custom status code
//     throw error; // This will be caught by the errorHandler
//   }

//   // Update the password and clear the reset token
//   user.password = newPassword;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpiry = undefined;
//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: "Password reset successfully",
//   });
// });

// module.exports = {
//   registerUser,
//   verifyEmail,
//   loginUser,
//   refreshAccessToken,
//   logoutUser,
//   changePassword,
//   deleteUser,
//   deleteAllUsers,
//   deleteSingleUser,
//   getAllUsers,
//   getSingleUser,
//   getAccountInfo,
//   updateUserRole,
//   resendVerificationEmail,
//   getUnverifiedUsers,
//   deleteUnverifiedUsers,
//   deleteAllUsersExceptAdmin,
//   forgotPassword,
//   resetPassword,
//   validateResetToken,
// };



































// const asyncHandler = require('express-async-handler');
// const User = require('../models/User');
// const { generateToken, generateRefreshToken } = require('../middlewares/auth');
// const { sendVerificationEmail } = require('../services/emailService');
// const { sendPasswordResetEmail } = require('../services/emailService');
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { createProfile } = require('../controllers/profileController');
// const { confirmPasswordMatch } = require('../validators/userValidator') 



// // Register User -------------------------------------------------------------
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password, confirmPassword } = req.body;

//   // Check if passwords match
//   confirmPasswordMatch(password, confirmPassword);

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   console.log('Raw password before saving:', password); // Debugging log

//   // Create user without manually hashing (Mongoose will hash it)
//   const user = await User.create({ username, email, password });


//   // Generate email verification token -------------------------------------------------------------
//   const verificationToken = crypto.randomBytes(40).toString('hex');
//   user.verificationToken = verificationToken;
//   user.verificationTokenExpires = Date.now() + 3600000; // 1 hour expiry
//   await user.save();

//   // Send email verification token to user's email address ---------------------------------------------
//   await sendVerificationEmail(email, verificationToken, username);

//   // Auto-create profile for traditional signup 
//   await createProfile(user._id, user.username); // profileImage is optional


//   res.status(201).json({
//     message: 'User registered successfully. Please check your email for verification.',
//   });
// });


// // Verify Email -------------------------------------------------------------
// const verifyEmail = asyncHandler(async (req, res) => {
//   const { token } = req.query;

//   const user = await User.findOne({
//     verificationToken: token,
//     verificationTokenExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     res.status(400);
//     throw new Error('Invalid or expired token');
//   }

//   user.isVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpires = undefined;
//   await user.save();

//   res.status(200).json({ message: 'Email verified successfully' });
// });

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt for email:', email);

//   const user = await User.findOne({ email: email.trim() });

//   if (!user) {
//     console.log('User not found');
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
//   console.log('Stored hashed password:', user.password);


//   // Compare passwords -------------------------------------------------------------
//   const passwordMatch = await bcrypt.compare(password.trim(), user.password);
//   console.log('Password match:', passwordMatch);

//   if (!passwordMatch) {
//     console.log('Password mismatch');
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }

//   if (!user.isVerified) {
//     console.log('User is not verified');
//     res.status(401);
//     throw new Error('Please verify your email to login');
//   }

//   // Generate JWT token and Refresh Token -------------------------------------------------------------
//   const token = generateToken(user._id, user.role); // Pass the role here
//   const refreshToken = generateRefreshToken(user._id, user.role);

//   // Log the refresh token to the console for verification
//   console.log('\nGenerated Refresh Token:', refreshToken);

//   // Store refresh token in the database (or secure storage)
//   user.refreshToken = refreshToken;
//   await user.save();

//   // Set refresh token in an HTTP-only cookie
//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production', // Ensure secure in production (Uncomment in production)
//     // secure: false,
//     sameSite: 'strict',
//     path: '/',
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });

//   console.log('\nLogin successful. Token generated:', token);

//   res.json({
//     _id: user._id,
//     username: user.username,
//     email: user.email,
//     role: user.role,
//     token,
//     refreshToken,
//   });
// });


// // Refresh Access Token -------------------------------------------------------------
// const refreshAccessToken = asyncHandler(async (req, res) => {
//   const { refreshToken } = req.cookies;

//   if (!refreshToken) {
//     res.status(401);
//     throw new Error('No refresh token provided');
//   }

//   // Verify the refresh token
//   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//   // Find the user by the decoded userId
//   const user = await User.findById(decoded.userId);

//   if (!user || user.refreshToken !== refreshToken) {
//     res.status(403);
//     throw new Error('Invalid refresh token');
//   }

//   // Generate a new access token
//   const newAccessToken = generateToken(user._id, user.role);

//   res.json({
//     token: newAccessToken,
//   });
// });

// // Logout User -------------------------------------------------------------
// const logoutUser = asyncHandler(async (req, res) => {
//   console.log('Cookies:', req.cookies);
//   const { refreshToken } = req.cookies;

//   if (!refreshToken) {
//     res.status(400);
//     throw new Error('No refresh token provided');
//   }

//   // Find the user by the refresh token and clear it
//   const user = await User.findOne({ refreshToken });

//   if (user) {
//     user.refreshToken = undefined;
//     await user.save();
//   }

//   // Clear the refresh token cookie
//   // res.clearCookie('refreshToken');

//   res.clearCookie('refreshToken', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production', // Secure in production, false in development
//     sameSite: 'strict',
//     path: '/', // Ensure the cookie is cleared for all routes
//   });

//   res.status(200).json({ message: 'Logged out successfully' });
// });



// // Change Password -------------------------------------------------------------
// const changePassword = asyncHandler(async (req, res) => {
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;
//   const user = await User.findById(req.user.userId);

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   // Check if new passwords match
//   confirmPasswordMatch(newPassword, confirmNewPassword);

//   const passwordMatch = await bcrypt.compare(currentPassword, user.password);
//   if (!passwordMatch) {
//     res.status(400);
//     throw new Error('Invalid current password');
//   }

//   user.password = newPassword;
//   await user.save();

//   res.status(200).json({ message: 'Password changed successfully' });
// });


// // Delete User ------------------------------------------------------------------------
// const deleteUser = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;

//   // Delete the user using deleteOne, which triggers the middleware
//   const result = await User.deleteOne({ _id: userId });

//   if (result.deletedCount === 0) {
//       res.status(404);
//       throw new Error('User not found');
//   }

//   res.status(200).json({ message: 'User account and all associated data deleted successfully' });
// });



// // Admin: Delete All Users ---------------------------------------------------------------
// const deleteAllUsers = asyncHandler(async (req, res) => {
//   await User.deleteMany({});
//   res.status(200).json({ message: 'All users deleted successfully' });
// });


// // Admin: Delete All Users Except Admins ---------------------------------------------------
// // const deleteAllUsersExceptAdmin = asyncHandler(async (req, res) => {
// //   await User.deleteMany({ role: { $ne: 'admin' } });
// //   res.status(200).json({ message: 'All users except admin deleted successfully' });
// // });

// // Admin: Delete All Users Except Admins
// const deleteAllUsersExceptAdmin = asyncHandler(async (req, res) => {
//   // Find and delete all users where the role is not 'admin'
//   const deleteResult = await User.deleteMany({ role: { $ne: 'admin' } });

//   // Extract the count of deleted users
//   const deletedCount = deleteResult.deletedCount;

//   // Prepare the response message based on the count
//   let message;
//   if (deletedCount > 0) {
//     message = `Successfully deleted ${deletedCount} user(s) except admin.`;
//   } else {
//     message = 'No users other than admin exist. Deleted count: 0.';
//   }

//   // Send the response with the count and message
//   res.status(200).json({
//     success: true,
//     message: message,
//     deletedCount: deletedCount,
//   });
// });


// // Admin: Delete Single User --------------------------------------------------------------
// const deleteSingleUser = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const user = await User.findByIdAndDelete(userId);

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   res.status(200).json({ message: 'User deleted successfully' });
// });

// // Admin: Get All Users --------------------------------------------------------------------
// const getAllUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({});
//   res.status(200).json(users);
// });

// // Admin: Get Single User ---------------------------------------------------------------------
// const getSingleUser = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const user = await User.findById(userId);

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   res.status(200).json(user);
// });

// // Get Account Info -----------------------------------------------------
// const getAccountInfo = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.userId);

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   res.status(200).json(user);
// });

// // Update User Role (Admin Only) -------------------------------------------------------------
// const updateUserRole = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const { role } = req.body;

//   // Validate the role
//   if (!['user', 'admin'].includes(role)) {
//     res.status(400);
//     throw new Error('Invalid role. Role must be either "user" or "admin".');
//   }

//   // Find the user by ID
//   const user = await User.findById(userId);

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   // Update the role
//   user.role = role;
//   await user.save();

//   res.status(200).json({ message: 'Role updated successfully' });
// });



// // Resend Verification Email -------------------------------------------------------------
// const resendVerificationEmail = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   if (user.isVerified) {
//     res.status(400);
//     throw new Error('Email is already verified');
//   }

//   // Generate a new verification token -------------------------------------------------------------
//   const verificationToken = crypto.randomBytes(40).toString('hex');
//   user.verificationToken = verificationToken;
//   user.verificationTokenExpires = Date.now() + 3600000; // 1 hour expiry
//   await user.save();

//   // Send the verification email
//   await sendVerificationEmail(user.email, verificationToken, user.username);

//   res.status(200).json({ message: 'Verification email resent successfully' });
// });



// // Admin: Get All Unverified Users -------------------------------------------------------------
// const getUnverifiedUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({ isVerified: false });
//   res.status(200).json(users);
// });

// // Admin: Delete Unverified Users -------------------------------------------------------------
// const deleteUnverifiedUsers = asyncHandler(async (req, res) => {
//   // Delete all users where isVerified is false
//   const result = await User.deleteMany({ isVerified: false });

//   if (result.deletedCount === 0) {
//     res.status(404).json({ message: "No unverified users found" });
//   } else {
//     res.status(200).json({ message: `${result.deletedCount} unverified users deleted successfully` });
//   }
// });



// // Forgot Password: Generate and send reset token -------------------------------------------------
// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//   }

//   const resetToken = crypto.randomBytes(20).toString('hex');
//   const resetTokenExpiry = Date.now() + 3600000;

//   const hashedToken = await bcrypt.hash(resetToken, 10);

//   user.resetPasswordToken = hashedToken;
//   user.resetPasswordExpiry = resetTokenExpiry;
//   await user.save();

//   await sendPasswordResetEmail(user.email, resetToken, user.username);

//   res.status(200).json({ message: 'Password reset email sent' });
// });


// // Validate Token and return user ID -------------------------------------------------------------------
// const validateResetToken = asyncHandler(async (req, res) => {
//   const { token } = req.query;

//   console.log('Token from URL:', token);

//   const user = await User.findOne({
//       resetPasswordToken: { $exists: true },
//       resetPasswordExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//   }

//   const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
//   if (!isTokenValid) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//   }

//   res.status(200).json({
//       message: 'Token is valid. You can now reset your password.',
//       userId: user._id, // Send the user's ID
//   });
// });


// // Reset Password: Update password using the token and user ID ----------------------------------------
// const resetPassword = asyncHandler(async (req, res) => {
//   const { token, newPassword, confirmNewPassword, userId } = req.body;

//   // Validate input
//   if (!token || !newPassword || !userId) {
//     res.status(400);
//     throw new Error('Token, new password, and user ID are required');
//   }

//   // Check if new passwords match
//   confirmPasswordMatch(newPassword, confirmNewPassword);

//   // Find the user by ID and check if the reset token is still valid
//   const user = await User.findOne({
//     _id: userId,
//     resetPasswordToken: { $exists: true },
//     resetPasswordExpiry: { $gt: Date.now() }, // Check if the token is not expired
//   });

//   if (!user) {
//     res.status(400);
//     throw new Error('Invalid or expired token');
//   }

//   // Verify the token (compare hashed token with the provided token)
//   const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
//   if (!isTokenValid) {
//     res.status(400);
//     throw new Error('Invalid or expired token');
//   }

//   // Update the password and clear the reset token
//   user.password = newPassword;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpiry = undefined;
//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: 'Password reset successfully',
//   });
// });


// module.exports = {
//   registerUser,
//   verifyEmail,
//   loginUser,
//   refreshAccessToken,
//   logoutUser,
//   changePassword,
//   deleteUser,
//   deleteAllUsers,
//   deleteSingleUser,
//   getAllUsers,
//   getSingleUser,
//   getAccountInfo,
//   updateUserRole,
//   resendVerificationEmail,
//   getUnverifiedUsers,
//   deleteUnverifiedUsers,
//   deleteAllUsersExceptAdmin,
//   forgotPassword,
//   resetPassword,
//   validateResetToken,
// };