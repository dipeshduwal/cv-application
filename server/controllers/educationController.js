const { createEducation, updateEducation, getEducation, deleteEducation} = require('../services/educationServices');
const { handleServerError } = require('../utils/serverErrorHandler');

// Create a new education entry for a user
exports.PostEducation = async (req, res) => {
    try {
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;  // Assuming the token contains 'email'
        const educationDetails = req.body;

        const newEducation = await createEducation(email, educationDetails);
        return res.status(201).json(newEducation);
    } catch (error) {
        console.error('PostEducation Error:', error);
        handleServerError(res, error);
    }
};

// Update an existing education entry for a user
exports.PutEducation = async (req, res) => {
    try {

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;
        const { educationId, ...educationDetails} = req.body;

        const updatedEducation = await updateEducation(email, educationId, educationDetails);
        return res.status(200).json(updatedEducation);
    } catch (error) {
        console.error('PutEducation Error:', error);
        handleServerError(res, error);
    }
};


// Get all education entries for a user
exports.GetEducation = async (req, res) => {
    try {
        // Extract the user's unique identifier (email) from the verified token
        const { email } = req.user;

        // Fetch all education records for the user based on their email
        const educationList = await getEducation(email);
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
        const result = await deleteEducation(email, educationId);
        return res.status(200).json(result);
    } catch (error) {
        console.error('DeleteEducation Error:', error);
        handleServerError(res, error);
    }
};
