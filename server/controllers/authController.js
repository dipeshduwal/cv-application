const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleServerError } = require('../utils/errorHandler');
require('dotenv').config();

// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const lowercasedUsername = username.toLowerCase();
        const lowercasedEmail = email.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: lowercasedEmail } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username: lowercasedUsername,
            email: lowercasedEmail,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        handleServerError(res, error);
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Convert email to lowercase before checking in the database
        const lowercasedEmail = email.toLowerCase();

        // Check if user exists
        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        handleServerError(res, error);
    }
};