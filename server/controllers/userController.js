const userService = require('../services/userServices');

exports.getUserProfile = async (req, res) => {
        const { email } = req.user;
        const user = await userService.getUserProfile(email);
        res.status(200).json(user);
};

exports.saveUserPreferences = async (req, res) => {
        const { email, accentColor, textColor, font, isVertical } = req.body;
        const response = await userService.saveUserPreferences(email, { accentColor, textColor, font, isVertical });
        res.status(200).json(response);
};
