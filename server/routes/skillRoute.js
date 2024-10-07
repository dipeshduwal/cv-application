const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 
const {PostSkill, GetSkill, PutSkill, DeleteSkill} = require('../controllers/skillController');

const router = express.Router();

router.post('/', authMiddleware, PostSkill);

router.get('/', authMiddleware, GetSkill);

router.put('/:id', authMiddleware, PutSkill);

router.delete('/:id', authMiddleware, DeleteSkill);

module.exports = router;
