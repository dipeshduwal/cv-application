const express = require('express');
const {PostExperience, PutExperience, GetExperience, DeleteExperience} = require('../controllers/experienceController'); 
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, PostExperience);

router.get('/', authMiddleware, GetExperience);

router.put('/:id', authMiddleware, PutExperience);

router.delete('/:id', authMiddleware, DeleteExperience);

module.exports = router;
