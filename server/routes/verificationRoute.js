const express = require('express');
const router = express.Router();
const {verifyOtp} = require('../controllers/verificationController');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

router.post('/verify-otp', errorHandlerWrapper(verifyOtp));

module.exports = router;
