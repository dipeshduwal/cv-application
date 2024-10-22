const express = require('express')
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');

const router = express.Router();

// Forgot Password - Request OTP
router.post('/forgot-password', errorHandlerWrapper(requestPasswordReset));

// Reset Password using OTP
router.post('/reset-password', errorHandlerWrapper(resetPassword));

module.exports = router;
