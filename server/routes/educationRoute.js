const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 
const {PostEducation, PutEducation, GetEducation, DeleteEducation} = require('../controllers/educationController')

const router = express.Router();

router.post('/', authMiddleware, PostEducation);

router.put('/:id', authMiddleware, PutEducation);

router.get('/', authMiddleware, GetEducation);

router.delete('/:id', authMiddleware, DeleteEducation);

module.exports = router;
