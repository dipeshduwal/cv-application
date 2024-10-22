const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 
const {PostSkill, GetSkill, PutSkill, DeleteSkill} = require('../controllers/skillController');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

const router = express.Router();

router.post('/', authMiddleware, errorHandlerWrapper(PostSkill));

router.get('/', authMiddleware, errorHandlerWrapper(GetSkill));

router.put('/:id', authMiddleware, errorHandlerWrapper(PutSkill));

router.delete('/:id', authMiddleware, errorHandlerWrapper(DeleteSkill));

module.exports = router;
