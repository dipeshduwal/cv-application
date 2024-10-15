const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');

const router = express.Router();

// Forgot Password - Request OTP
router.post('/forgot-password', requestPasswordReset);

// Reset Password using OTP
router.post('/reset-password', resetPassword);

module.exports = router;
