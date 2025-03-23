
// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middlewares/auth');
// const { 
//         googleAuth, 
//         googleAuthCallback, 
//         handleGoogleAuthCallback, 
//         refreshAccessToken,
//         logout,
//         switchAccount 
//     } = require('../controllers/authController');


// // Google OAuth2 routes
// router.get('/auth/google', googleAuth);
// router.get('/auth/google/callback', googleAuthCallback, handleGoogleAuthCallback);
// router.post('/auth/logout', protect, logout);
// router.get('/auth/switch-account', protect, switchAccount);

// // Refresh token route
// router.post('/auth/refresh-token', async (req, res) => {
//     const refreshToken = req.body.refreshToken;
//     try {
//         const tokens = await oauth2Client.refreshAccessToken(refreshToken);
//         res.json({ accessToken: tokens.access_token });
//     } catch (error) {
//         console.error('Token refresh failed:', error);
//         res.status(400).json({ message: 'Invalid refresh token' });
//     }
// });

// module.exports = router;












const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/auth');
const { 
    googleAuth, 
    googleAuthCallback, 
    handleGoogleAuthCallback, 
    refreshAccessToken,
    logout,
    switchAccount 
} = require('../controllers/authController');

/**
 * @swagger
 * /users/auth/google:
 *   get:
 *     summary: Google OAuth authentication
 *     description: Redirects user to Google's authentication page.
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth.
 */
router.get('/auth/google', googleAuth);

/**
 * @swagger
 * /users/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles Google's OAuth callback and authenticates the user.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Google.
 *       400:
 *         description: Authentication failed.
 */
router.get('/auth/google/callback', googleAuthCallback, handleGoogleAuthCallback);

/**
 * @swagger
 * /users/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the user and clears authentication cookies.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out.
 */
router.post('/auth/logout', protect, logout);

/**
 * @swagger
 * /users/auth/switch-account:
 *   get:
 *     summary: Switch user account
 *     description: Allows a logged-in user to switch accounts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account switched successfully.
 */
router.get('/auth/switch-account', switchAccount);

/**
 * @swagger
 * /users/auth/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     description: Refreshes the access token using a refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a new access token.
 *       400:
 *         description: Invalid refresh token.
 */
router.post('/auth/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    try {
        const tokens = await oauth2Client.refreshAccessToken(refreshToken);
        res.json({ accessToken: tokens.access_token });
    } catch (error) {
        console.error('Token refresh failed:', error);
        res.status(400).json({ message: 'Invalid refresh token' });
    }
});

module.exports = router;
