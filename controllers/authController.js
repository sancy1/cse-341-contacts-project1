// // controllers/authController.js
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { createProfile } = require('./profileController');
// const { generateToken, generateRefreshToken } = require('../middlewares/auth');

// // Wrap passport.authenticate in a function to ensure it exports correctly
// const googleAuth = (req, res, next) => {
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// };

// const googleAuthCallback = (req, res, next) => {
//     passport.authenticate('google', { failureRedirect: '/login', session: false })(req, res, next);
// };

// const handleGoogleAuthCallback = async (req, res) => {
//     // Ensure req.user exists and is structured correctly.
//     if (!req.user) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }

//     console.log('req.user:', req.user); // Add this line

//     // Depending on your Passport strategy, req.user might be the user itself.
//     const user = req.user;
//     const token = generateToken(user._id, user.role);
//     const refreshToken = generateRefreshToken(user._id, user.role);

//     // Add this console.log to inspect user._id
//     console.log('user._id before createProfile:', user._id);

//     // Auto-create profile for Google user
//     const profile = await createProfile(user._id, user.username, user.profileImage);

//     // Set refresh token in an HTTP-only cookie
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         path: '/',
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Return the access token and user details
//     res.status(200).json({
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         profileImage: user.profileImage,
//         role: user.role,
//         token, // Access token
//         profile: {
//             _id: profile._id,
//             name: profile.name,
//             biography: profile.biography,
//             professionalInfo: profile.professionalInfo,
//             profileImage: profile.profileImage,
//             createdAt: profile.createdAt,
//             updatedAt: profile.updatedAt,
//         },
//     });
// };


// // Refresh Access Token
// const refreshAccessToken = async (req, res) => {
//     const { refreshToken } = req.cookies;

//     if (!refreshToken) {
//         return res.status(401).json({ message: 'No refresh token provided' });
//     }

//     try {
//         // Verify the refresh token
//         const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//         // Find the user by the decoded userId
//         const user = await User.findById(decoded.userId);

//         if (!user || user.refreshToken !== refreshToken) {
//             return res.status(403).json({ message: 'Invalid refresh token' });
//         }

//         // Generate a new access token
//         const newAccessToken = generateToken(user._id, user.role);

//         return res.status(200).json({ token: newAccessToken });
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// module.exports = {
//     googleAuth,
//     googleAuthCallback,
//     handleGoogleAuthCallback,
//     refreshAccessToken, // Now exported properly
// };


























// // controllers/authController.js
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Profile = require('../models/Profile'); // Import Profile model
// const { createProfile } = require('./profileController');
// const { generateToken, generateRefreshToken } = require('../middlewares/auth');

// // Wrap passport.authenticate in a function to ensure it exports correctly
// const googleAuth = (req, res, next) => {
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// };

// const googleAuthCallback = (req, res, next) => {
//     passport.authenticate('google', { failureRedirect: '/login', session: false })(req, res, next);
// };

// // controllers/authController.js
// const handleGoogleAuthCallback = async (req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }

//     console.log('req.user:', req.user);

//     const user = req.user;
//     const token = generateToken(user._id, user.role);
//     const refreshToken = generateRefreshToken(user._id, user.role);

//     console.log('user._id before profile check:', user._id);

//     // DO NOT store tokens in the user document anymore

//     let profile = await Profile.findOne({ userId: user._id });

//     if (!profile) {
//         profile = await createProfile(user._id, user.username, user.profileImage);
//     }

//     if (profile) {
//         // Send both access token and refresh token in the JSON response for backend testing
//         res.status(200).json({
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             profileImage: user.profileImage,
//             role: user.role,
//             token,           // Send the access token
//             refreshToken,    // Send the refresh token
//             profile: {
//                 _id: profile._id,
//                 name: profile.name,
//                 biography: profile.biography,
//                 professionalInfo: profile.professionalInfo,
//                 profileImage: profile.profileImage,
//                 createdAt: profile.createdAt,
//                 updatedAt: profile.updatedAt,
//             },
//         });
//     } else {
//         res.status(500).json({ message: 'Failed to create or retrieve profile' });
//     }
// };

// // Refresh Access Token
// const refreshAccessToken = async (req, res) => {
//     const { refreshToken } = req.body; // Expect refresh token in the request body

//     if (!refreshToken) {
//         return res.status(401).json({ message: 'No refresh token provided' });
//     }

//     try {
//         const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//         const user = await User.findById(decoded.userId);

//         if (!user) {
//             return res.status(403).json({ message: 'Invalid refresh token' });
//         }

//         const newAccessToken = generateToken(user._id, user.role);
//         return res.status(200).json({ token: newAccessToken });
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// module.exports = {
//     googleAuth,
//     googleAuthCallback,
//     handleGoogleAuthCallback,
//     refreshAccessToken,
// };















const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { createProfile } = require('./profileController');
const { generateToken, generateRefreshToken } = require('../middlewares/auth');
require('dotenv').config(); // Load environment variables


const switchGoogleAccountAuhUrl = process.env.SWITCH_GOOGLE_ACCOUNT;

// Wrap passport.authenticate in a function to ensure it exports correctly
const googleAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login', session: false })(req, res, next);
};

const handleGoogleAuthCallback = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    console.log('req.user:', req.user);

    const user = req.user;
    const token = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    console.log('user._id before profile check:', user._id);

    let profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
        profile = await createProfile(user._id, user.username, user.profileImage);
    }

    if (profile) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role,
            token,
            refreshToken,
            profile: {
                _id: profile._id,
                name: profile.name,
                biography: profile.biography,
                professionalInfo: profile.professionalInfo,
                profileImage: profile.profileImage,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
            },
        });
    } else {
        res.status(500).json({ message: 'Failed to create or retrieve profile' });
    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateToken(user._id, user.role);
        return res.status(200).json({ token: newAccessToken });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Logout Function
const logout = (req, res) => {
    res.clearCookie('token');
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Switch Account Function (if needed)
const switchAccount = async (req, res) => {
    res.redirect(switchGoogleAccountAuhUrl); // Redirect to Google OAuth login
};

module.exports = {
    googleAuth,
    googleAuthCallback,
    handleGoogleAuthCallback,
    refreshAccessToken,
    logout,
    switchAccount,
};