const express = require('express');
const {GetInfo, PostInfo, DeleteInfo} = require('../controllers/personalInfoController');
const authMiddleware = require('../middleware/authMiddleware'); 
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper');

const router = express.Router();

router.get('/', authMiddleware, errorHandlerWrapper(GetInfo));

router.post('/', authMiddleware, errorHandlerWrapper(PostInfo));

router.delete('/:id', authMiddleware, errorHandlerWrapper(DeleteInfo));

module.exports = router;
