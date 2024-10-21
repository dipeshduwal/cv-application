const { signup, login } = require('../services/authServices');
const { handleServerError } = require('../utils/serverErrorHandler');


// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const result = await signup(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        handleServerError(res, err);
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (err) {
        handleServerError(res, err); 
    }
};
