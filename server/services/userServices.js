const User = require('../models/user');

const getUserProfile = async (email) => {
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'username', 'email', 'accentColor', 'font'] 
    });
    
    if (!user) throw new Error('Invalid Credentials');
        return user;
};

 const saveUserPreferences = async (email, accentColor, textColor, font, isVertical) => {
        const user = await User.findOne({ where: { email }});
        if (!user) {
            throw new Error('User not found');
        }
        
        user.set({
            accentColor: accentColor,
            textColor: textColor,
            font: font,
            isVertical: isVertical,
        });
        
        await user.save();

        return { success: true, message: 'Preferences saved successfully' };
};

module.exports = {
    getUserProfile, saveUserPreferences,
};