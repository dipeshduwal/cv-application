const { createEducation, updateEducation, getEducation, deleteEducation} = require('../services/educationServices');

// Create a new education entry for a user
exports.PostEducation = async (req, res) => {
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;  // Assuming the token contains 'email'
        const educationDetails = req.body;

        const newEducation = await createEducation(email, educationDetails);
        return res.status(201).json(newEducation);
};

// Update an existing education entry for a user
exports.PutEducation = async (req, res) => {
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;
        const { educationId, ...educationDetails} = req.body;

        const updatedEducation = await updateEducation(email, educationId, educationDetails);
        return res.status(200).json(updatedEducation);
};

// Get all education entries for a user
exports.GetEducation = async (req, res) => {
        // Extract the user's unique identifier (email) from the verified token
        const { email } = req.user;

        // Fetch all education records for the user based on their email
        const educationList = await getEducation(email);

        return res.status(200).json(educationList || []);
};

// Delete a specific education entry for a user
exports.DeleteEducation = async (req, res) => {
        const educationId = req.params.id;  // Get the specific education ID to delete

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;

        // Find and delete the education record for the user based on their email and the education ID
        const result = await deleteEducation(email, educationId);
        return res.status(200).json(result);
};
