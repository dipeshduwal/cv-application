const userService = require('../services/userServices');

// Controller to get user profile and preferences
const getUserProfile = async (req, res) => {
    const { email } = req.query;
        const user = await userService.getUserProfile(email);
        res.status(200).json(user);
};

// Controller to save user preferences
const saveUserPreferences = async (req, res) => {
    const { email, accentColor, textColor, font, isVertical } = req.body;
        const response = await userService.saveUserPreferences(email, { accentColor, textColor, font, isVertical });
        res.status(200).json(response);
};

module.exports = {
    getUserProfile,
    saveUserPreferences,
};
