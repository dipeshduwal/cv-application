const express = require('express');
const {PostSkill, GetSkill, PutSkill, DeleteSkill} = require('../controllers/skillController');

const router = express.Router();

router.post('/', PostSkill);

router.get('/', GetSkill);

router.put('/:id', PutSkill);

router.delete('/:id', DeleteSkill);

module.exports = router;
