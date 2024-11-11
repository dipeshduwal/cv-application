const express = require('express');
const {getUserProfile, saveUserPreferences} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

const router = express.Router();

router.get('/', authMiddleware, errorHandlerWrapper(getUserProfile));
router.post('/save-preferences', errorHandlerWrapper(saveUserPreferences));

module.exports = router;