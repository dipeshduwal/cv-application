const express = require('express')
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');

const router = express.Router();

router.post('/forgot-password', errorHandlerWrapper(requestPasswordReset));
router.post('/reset-password', errorHandlerWrapper(resetPassword));

module.exports = router;
