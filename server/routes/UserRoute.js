const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/AuthMiddleware'); 

const router = express.Router();

// Get User Profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email'] 
        });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
});

module.exports = router;