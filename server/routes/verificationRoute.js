const express = require('express');
const router = express.Router();
const {verifyOtp, resendOtp} = require('../controllers/verificationController');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

router.post('/verify-otp', errorHandlerWrapper(verifyOtp));
router.post('/resend-otp', errorHandlerWrapper(resendOtp));

module.exports = router;
