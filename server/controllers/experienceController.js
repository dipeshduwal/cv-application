const { createExperience, updateExperience, getExperience, deleteExperience} =  require('../services/experienceServices')
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostExperience = async (req, res) => {
    try {
        const { email } = req.user;
        const experienceDetails = req.body;

        const newExperience = await createExperience(email, experienceDetails);
        return res.status(201).json(newExperience);
    } catch (error) {
        console.error('PostExperience Error:', error);
        handleServerError(res, error);
    }
};

exports.PutExperience = async (req, res) => {
    try {
        const { experienceId, ...experienceDetails } = req.body;
        const { email } = req.user;

        const updatedExperience = await updateExperience(email, experienceId, experienceDetails);
        return res.status(200).json(updatedExperience);
    } catch (error) {
        console.error('PutExperience Error:', error);
        handleServerError(res, error);
    }
};

exports.GetExperience = async (req, res) => {
    try {
        // Extract the user's unique identifier (email) from the verified token
        const { email } = req.user;

        // Fetch all education records for the user based on their email
         res.status(200).json(experienceList);
    } catch (error) {
        console.error('GetExperience Error:', error);
        handleServerError(res, error);
    }
};

exports.DeleteExperience = async (req, res) => {
    try {
        const experienceId = req.params.id;  

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;

        res.status(200).json({ message: 'Experience record deleted successfully' });
    } catch (error) {
        console.error('DeleteExperience Error:', error);
        handleServerError(res, error);
    }
};
