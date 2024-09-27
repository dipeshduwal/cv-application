const express = require('express');
const Experience = require('../models/Experience');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.findAll();
        res.status(200).json(experiences); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Experience.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedExperience = await Experience.findByPk(req.params.id);
            res.status(200).json(updatedExperience); // Respond with the updated entry
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Experience.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // Respond with no content on successful delete
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
