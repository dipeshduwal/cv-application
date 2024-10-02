const express = require('express');
const {PostEducation, PutEducation, GetEducation, DeleteEducation} = require('../controllers/educationController')

const router = express.Router();

router.post('/', PostEducation);

router.get('/', GetEducation);

router.put('/:id', PutEducation);

router.delete('/:id', DeleteEducation);

module.exports = router;
