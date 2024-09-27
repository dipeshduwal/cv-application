const express = require('express');
const PersonalInfo = require('../models/PersonalInfo');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const personalinfo = await PersonalInfo.create(req.body);
        res.status(201).json(personalinfo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const personalinfos = await PersonalInfo.findAll();
        res.status(200).json(personalinfos); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await PersonalInfo.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedInfo = await PersonalInfo.findByPk(req.params.id);
            res.status(200).json(updatedInfo); // Respond with the updated entry
        } else {
            res.status(404).json({ message: 'Personal Info not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await PersonalInfo.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // Respond with no content on successful delete
        } else {
            res.status(404).json({ message: 'Personal Info not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
