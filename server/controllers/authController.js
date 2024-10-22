const { signup, login } = require('../services/authServices');

// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const result = await signup(username, email, password);
    res.status(201).json(result);
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
};
