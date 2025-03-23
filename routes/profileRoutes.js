// // routes/profileRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middlewares/auth');
// const { createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

// router.get('/profile', protect, createProfile);
// router.put('/profile', protect, updateProfile);
// router.delete('/profile', protect, deleteProfile);

// module.exports = router;








const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { profileValidationRules } = require("../validators/profileValidation");
const validate = require("../middlewares/validate");
const {
    getProfile, 
    updateProfile,
    deleteProfile,
} = require('../controllers/profileController');

// Route to get the user's own profile
router.get('/profile', protect, getProfile);

// Route to update the user's profile
router.put('/profile', protect, profileValidationRules(), validate, updateProfile);

// Route to update some parts of user's profile
router.patch("/profile", protect, profileValidationRules(), validate, updateProfile);

// Route to delete the user's profile
router.delete('/profile', protect, deleteProfile);

module.exports = router;