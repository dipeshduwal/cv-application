const express = require('express');
const {PostExperience, PutExperience, GetExperience, DeleteExperience} = require('../controllers/experienceController'); 

const router = express.Router();

router.post('/', PostExperience);

router.get('/', GetExperience);

router.put('/:id', PutExperience);

router.delete('/:id', DeleteExperience);

module.exports = router;
