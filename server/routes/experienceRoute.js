const express = require('express'); 
const authMiddleware = require('../middleware/authMiddleware');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');
const {PostExperience, PutExperience, GetExperience, DeleteExperience} = require('../controllers/experienceController');

const router = express.Router();

router.post('/', authMiddleware, errorHandlerWrapper(PostExperience));

router.get('/', authMiddleware, errorHandlerWrapper(GetExperience));

router.put('/:id', authMiddleware, errorHandlerWrapper(PutExperience));

router.delete('/:id', authMiddleware, errorHandlerWrapper(DeleteExperience));

module.exports = router;
