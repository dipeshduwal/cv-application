const {
    createOrUpdateInfo,
    getInfo,
    deleteInfo,
} = require('../services/personalInfoServices');
const { handleServerError } = require('../utils/serverErrorHandler');

// Create or update personal info
exports.PostInfo = async (req, res) => {
    try {
        const { email: userEmail } = req.user;
        const info = req.body;
        const file = req.files?.profileImage;

        const updatedInfo = await createOrUpdateInfo(userEmail, info, file);
        res.status(201).json(updatedInfo);
    } catch (error) {
        console.error('Error in PostInfo:', error);
        handleServerError(res, error);
    }
};

// Get personal info
exports.GetInfo = async (req, res) => {
    try {
        const { email: userEmail } = req.user;
        const personalInfo = await getInfo(userEmail);
        res.status(200).json(personalInfo);
    } catch (error) {
        console.error('Error in GetInfo:', error);
        handleServerError(res, error);
    }
};

// Delete personal info
exports.DeleteInfo = async (req, res) => {
    try {
        const { email: userEmail } = req.user;
        const result = await deleteInfo(userEmail);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in DeleteInfo:', error);
        handleServerError(res, error);
    }
};
