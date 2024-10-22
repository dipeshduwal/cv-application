const {
    createOrUpdateInfo,
    getInfo,
    deleteInfo,
} = require('../services/personalInfoServices');

// Create or update personal info
exports.PostInfo = async (req, res) => {
        const { email: userEmail } = req.user;
        const info = req.body;
        const file = req.files?.profileImage;

        const updatedInfo = await createOrUpdateInfo(userEmail, info, file);
        res.status(201).json(updatedInfo);
};

// Get personal info
exports.GetInfo = async (req, res) => {
        const { email: userEmail } = req.user;
        const personalInfo = await getInfo(userEmail);

        if (!personalInfo) {
            return res.status(404).json({ message: "Personal info not found" });
        }
        res.status(200).json(personalInfo);
};

// Delete personal info
exports.DeleteInfo = async (req, res) => {
        const { email: userEmail } = req.user;
        const result = await deleteInfo(userEmail);
        res.status(200).json(result);
};
