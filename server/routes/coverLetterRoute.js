const express = require('express');
const router = express.Router();
const { generateCoverLetterController } = require('../controllers/coverLetterController');

router.post('/', generateCoverLetterController);

module.exports = router;
