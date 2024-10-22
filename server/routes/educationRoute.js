const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const errorHandlerWrapper = require('../middleware/errorHandlerWrapper'); 
const {PostEducation, PutEducation, GetEducation, DeleteEducation} = require('../controllers/educationController')

const router = express.Router();

router.post('/', authMiddleware, errorHandlerWrapper(PostEducation));

router.put('/:id', authMiddleware, errorHandlerWrapper(PutEducation));

router.get('/', authMiddleware, errorHandlerWrapper(GetEducation));

router.delete('/:id', authMiddleware, errorHandlerWrapper(DeleteEducation));

module.exports = router;
