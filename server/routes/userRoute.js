const express = require('express');
const {GetProfile} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

const router = express.Router();

// Get User Profile
router.get('/', authMiddleware, errorHandlerWrapper(GetProfile));

module.exports = router;