const express = require('express');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.post('/signup', errorHandlerWrapper(signup));

// Login Route
router.post('/login', errorHandlerWrapper(login));

module.exports = router;
