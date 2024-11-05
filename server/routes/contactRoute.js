const express = require('express');
const { sendMessage } = require('../controllers/contactController');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');
const router = express.Router();

// POST /contact
router.post('/', errorHandlerWrapper(sendMessage));

module.exports = router;
