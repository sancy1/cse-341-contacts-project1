// // controllers/profileController.js
// const asyncHandler = require('express-async-handler');
// const Profile = require('../models/Profile');
// const User = require('../models/User');
// const generateAvatar = require('../utils/avatarGenerator');

// // Auto-create profile for a user
// const createProfile = asyncHandler(async (userId, username, profileImage = null) => {
//     if (!userId) {
//         throw new Error('userId is missing in createProfile()');
//     }

//     // Use the provided profileImage or generate a default one using the avatar generator
//     const image = profileImage || generateAvatar(username);

//     const profile = new Profile({
//         userId,
//         name: username,
//         biography: '', // Add default value
//         professionalInfo: '', // Add default value
//         profileImage: image,
//     });
//     await profile.save();

//     // Update user with profile reference
//     await User.findByIdAndUpdate(userId, { profile: profile._id });

//     return profile;
// });


// // Update user profile
// const updateProfile = asyncHandler(async (req, res) => {
//     const { name, address, profileImage, biography, professionalInfo } = req.body;
//     const profile = await Profile.findOneAndUpdate(
//         { userId: req.user._id },
//         { name, address, profileImage, biography, professionalInfo },
//         { new: true }
//     );
//     res.status(200).json(profile);
// });

// // Delete user profile and account
// const deleteProfile = asyncHandler(async (req, res) => {
//     await Profile.findOneAndDelete({ userId: req.user._id });
//     await User.findByIdAndDelete(req.user._id);
//     res.status(200).json({ message: 'Profile and user account deleted successfully' });
// });

// module.exports = {
//     createProfile,
//     updateProfile,
//     deleteProfile,
// };
















// controllers/profileController.js
const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');
const User = require('../models/User');
const generateAvatar = require('../utils/avatarGenerator');

// Auto-create profile for a user
const createProfile = asyncHandler(async (userId, username, profileImage = null) => {
    if (!userId) {
        throw new Error('userId is missing in createProfile()');
    }

    // Use the provided profileImage or generate a default one using the avatar generator
    const image = profileImage || generateAvatar(username);

    const profile = new Profile({
        userId,
        name: username,
        biography: '', // Add default value
        professionalInfo: '', // Add default value
        profileImage: image,
    });
    await profile.save();

    // Update user with profile reference
    await User.findByIdAndUpdate(userId, { profile: profile._id });

    return profile;
});


// Get user profile with user information
const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ userId: req.user.userId });

    if (profile) {
        const user = await User.findById(profile.userId).select('-password'); // Exclude the password field

        if (user) {
            res.status(200).json({
                user: user, // User data first
                profile: profile, // Then profile data
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(404).json({ message: 'Profile not found' });
    }
});


// Update user profile
const updateProfile = asyncHandler(async (req, res) => {
    const { name, address, profileImage, biography, professionalInfo } = req.body;
  
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }
  
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId }, // Access userId from req.user
      { name, address, profileImage, biography, professionalInfo },
      { new: true }
    );
  
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  });

// Delete user profile and account
const deleteProfile = asyncHandler(async (req, res) => {
    await Profile.findOneAndDelete({ userId: req.user.userId }); // Access userId from req.user
    await User.findByIdAndDelete(req.user.userId);
    res.status(200).json({ message: 'Profile and user account deleted successfully' });
});

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
};
