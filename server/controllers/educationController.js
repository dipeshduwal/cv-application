const Education = require('../models/education');
const { handleServerError } = require('../utils/serverErrorHandler');

// Create or update education entry for a user
exports.PostEducation = async (req, res) => {
    try {
        const { school, degree, fieldOfStudy, startDate, endDate, description, educationId } = req.body;

        // Extract the user's unique identifier (username or email) from the token
        const { email } = req.user;  // Assuming the token contains 'email'

        let educationData;

        // Check if the request includes an educationId for editing
        if (educationId) {
            // Find the existing education entry by its ID and ensure it belongs to the user (by email)
            const existingEducation = await Education.findOne({
                where: { id: educationId, userEmail: email }  // Use the email to verify ownership
            });

            if (!existingEducation) {
                return res.status(404).json({ message: 'Education record not found or you do not have permission to edit' });
            }

            // Update the existing education entry
            educationData = await existingEducation.update({
                school,
                degree,
                fieldOfStudy,
                startDate,
                endDate,
                description
            });

            return res.status(200).json(educationData);
        } else {
            // Create a new education entry linked to the user (by email)
            educationData = await Education.create({
                userEmail: email,  // Store email instead of userId
                school,
                degree,
                fieldOfStudy,
                startDate,
                endDate,
                description
            });

            return res.status(201).json(educationData);
        }
    } catch (error) {
        console.error('PostEducation Error:', error);
        handleServerError(res, error);
    }
};

// Get all education entries for a user
exports.GetEducation = async (req, res) => {
    try {
        // Extract the user's unique identifier (email) from the verified token
        const { email } = req.user;

        // Fetch all education records for the user based on their email
        const educationList = await Education.findAll({ where: { userEmail: email } });

        if (!educationList || educationList.length === 0) {
            return res.status(404).json({ message: 'No education records found' });
        }

        return res.status(200).json(educationList);
    } catch (error) {
        console.error('GetEducation Error:', error);
        handleServerError(res, error);
    }
};

// Delete a specific education entry for a user
exports.DeleteEducation = async (req, res) => {
    try {
        const educationId = req.params.id;  // Get the specific education ID to delete

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;

        // Find and delete the education record for the user based on their email and the education ID
        const education = await Education.findOne({ 
            where: { 
                id: educationId,  // Ensure the education ID matches
                userEmail: email   // Ensure the user owns this education record based on email
            }
        });

        if (!education) {
            return res.status(404).json({ message: 'Education record not found or you do not have permission to delete' });
        }

        await education.destroy();
        return res.status(200).json({ message: 'Education record deleted successfully' });
    } catch (error) {
        console.error('DeleteEducation Error:', error);
        handleServerError(res, error);
    }
};
