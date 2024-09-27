const express = require('express');
const Education = require('../models/Education');

// Create a new education entry
app.post('/educations', async (req, res) => {
    try {
        const education = await Education.create(req.body);
        res.status(201).json(education); // Respond with the created education entry
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all education entries
app.get('/educations', async (req, res) => {
    try {
        const educations = await Education.findAll();
        res.status(200).json(educations); // Respond with all education entries
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an education entry
app.put('/educations/:id', async (req, res) => {
    try {
        const [updated] = await Education.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEducation = await Education.findByPk(req.params.id);
            res.status(200).json(updatedEducation); // Respond with the updated entry
        } else {
            res.status(404).json({ message: 'Education not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an education entry
app.delete('/educations/:id', async (req, res) => {
    try {
        const deleted = await Education.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // Respond with no content on successful delete
        } else {
            res.status(404).json({ message: 'Education not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
