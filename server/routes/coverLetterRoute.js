const express = require('express');
const router = express.Router();
const { generateCoverLetterController } = require('../controllers/coverLetterController');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

router.post('/', errorHandlerWrapper(generateCoverLetterController));

module.exports = router;
