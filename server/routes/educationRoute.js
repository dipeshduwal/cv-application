const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 
const {PostEducation, GetEducation, DeleteEducation} = require('../controllers/educationController')

const router = express.Router();

router.post('/', authMiddleware, PostEducation);

router.get('/', authMiddleware, GetEducation);

router.delete('/:id', authMiddleware, DeleteEducation);

module.exports = router;
