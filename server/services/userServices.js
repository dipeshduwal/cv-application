const User = require('../models/user');

// Function to get user profile and preferences by email
const getUserProfile = async (email) => {
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'username', 'email', 'accentColor', 'textColor', 'font', 'isVertical'],
    });

    if (!user) {
        throw new Error('Invalid Credentials');
    }
    return user;
};

// Function to save user preferences
const saveUserPreferences = async (email, preferences) => {
    const { accentColor, textColor, font, isVertical } = preferences;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    user.set({
        accentColor,
        textColor,
        font,
        isVertical,
    });

    await user.save();

    return { success: true, message: 'Preferences saved successfully' };
};

module.exports = {
    getUserProfile,
    saveUserPreferences,
};
