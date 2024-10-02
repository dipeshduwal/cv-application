const express = require('express');
const {GetInfo, PostInfo, DeleteInfo} = require('../controllers/personalInfoController');

const router = express.Router();

router.get('/', GetInfo);

router.post('/', PostInfo);

router.delete('/:id', DeleteInfo);

module.exports = router;
