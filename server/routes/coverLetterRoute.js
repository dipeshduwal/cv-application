const express = require('express');
const router = express.Router();
const { generateCoverLetterController } = require('./coverLetterController');

router.post('/generate-letter', generateCoverLetterController);

module.exports = router;
