const userService = require('../services/userServices');

const getUserProfile = async (req, res) => {
        const { email } = req.query;
        const user = await userService.getUserProfile(email);
        res.status(200).json(user);
};

const saveUserPreferences = async (req, res) => {
        const { email, accentColor, textColor, font, isVertical } = req.body;
        const response = await userService.saveUserPreferences(email, { accentColor, textColor, font, isVertical });
        res.status(200).json(response);
};

module.exports = {
        getUserProfile,
        saveUserPreferences,
};
