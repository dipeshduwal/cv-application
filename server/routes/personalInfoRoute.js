const express = require('express');
const PersonalInfo = require('../models/personalInfo');
const router = express.Router();

// Get personal info
router.get('/', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.status(200).json(personalInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create or update personal info
router.post('/', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.upsert(req.body); // Upsert for either insert or update
        res.status(201).json(personalInfo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PersonalInfo.destroy({
            where: { id }
        });
        
        if (result) {
            res.status(200).json({ message: 'Personal info deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Personal info not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
