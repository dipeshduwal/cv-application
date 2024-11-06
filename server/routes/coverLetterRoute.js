const express = require('express');
const router = express.Router();
const { generateCoverLetterController } = require('../controllers/coverLetterController');

router.post('/generate', generateCoverLetterController);

module.exports = router;
