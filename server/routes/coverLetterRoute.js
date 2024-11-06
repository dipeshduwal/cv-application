const express = require('express');
const router = express.Router();
const { generateCoverLetterController } = require('../controllers/coverLetterController');

router.post('/generate-letter', generateCoverLetterController);

module.exports = router;
