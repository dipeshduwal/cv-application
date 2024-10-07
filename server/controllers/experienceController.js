const Experience = require('../models/experience');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostExperience = async (req, res) => {
    try {
        const { company, position, startDate, endDate, responsibilities } = req.body;
        
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;  // Assuming the token contains 'email'

        const experienceData = await Experience.create({
            userEmail: email,  // Store email instead of userId
            company,
            position,
            startDate,
            endDate,
            responsibilities
        });

        return res.status(201).json(experienceData);
    } catch (error) {
        console.error('PostExperience Error:', error);
        handleServerError(res, error);
    }
};

exports.PutExperience = async (req, res) => {
    try {
        const { experienceId, company, position, startDate, endDate, responsibilities } = req.body;
        
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;

        const existingExperience = await Experience.findOne({
            where: { id: experienceId, userEmail: email }  // Use the email to verify ownership
        });

        if (!existingExperience) {
            return res.status(404).json({ message: 'Experience record not found or you do not have permission to edit' });
        }

        const updatedExperience = await existingExperience.update({
            company,
            position,
            startDate,
            endDate,
            responsibilities
        });

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
        const experienceList = await Experience.findAll({ where: { userEmail: email } });

        if (!experienceList || experienceList.length === 0) {
            return res.status(404).json({ message: 'No experience records found' });
        }

        return res.status(200).json(experienceList);
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

        const experience = await Experience.findOne({ 
            where: { 
                id: experienceId,  // Ensure the education ID matches
                userEmail: email   // Ensure the user owns this education record based on email
            }
        });

        if (!experience) {
            return res.status(404).json({ message: 'Experience record not found or you do not have permission to delete' });
        }

        await experience.destroy();
        return res.status(200).json({ message: 'Experience record deleted successfully' });
    } catch (error) {
        console.error('DeleteExperience Error:', error);
        handleServerError(res, error);
    }
};
