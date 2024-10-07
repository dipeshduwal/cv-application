const express = require('express');
const {GetProfile} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

// Get User Profile
router.get('/', authMiddleware, GetProfile);

module.exports = router;