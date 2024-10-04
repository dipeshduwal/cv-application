const express = require('express');
const {GetInfo, PostInfo, DeleteInfo} = require('../controllers/personalInfoController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/', authMiddleware, GetInfo);

router.post('/', authMiddleware, PostInfo);

router.delete('/:id', authMiddleware, DeleteInfo);

module.exports = router;
