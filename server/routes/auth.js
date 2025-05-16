// File: routes/auth.js
const express = require('express');
const router = express.Router();

// Import controllers
const {
  register,
  verifyEmail,
  login,
  logout,
  getProfile,
  updateProfile
} = require('./controllers/authController');

// Import middleware
const { handleValidation, requireAuth, loadUser, requireVerified } = require('./controllers/authMiddleware');
// Import validators
const { registerRules, verifyRules, loginRules, updateRules } = require('./controllers/authValidators');

// Register
router.post('/register', registerRules, handleValidation, register);

// Verify Email
router.get('/verify/:token', verifyRules, handleValidation, verifyEmail);

// Login
router.post('/login', loginRules, handleValidation, login);

// Logout
router.post('/logout', requireAuth, logout);

// Get Profile
router.get('/profile', requireAuth, loadUser, getProfile);

// Update Profile
router.put('/profile', requireAuth, loadUser, updateRules, handleValidation, updateProfile);

module.exports = router;
