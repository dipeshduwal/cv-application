const Education = require('../models/education');

const createEducation = async (email, educationDetails) => {
    const { school, degree, fieldOfStudy, startDate, endDate, description } = educationDetails;

    // Create a new education entry linked to the user (by email)
    const newEducation = await Education.create({
        userEmail: email,  // Store email instead of userId
            school,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
    });

    return newEducation;
};

const updateEducation = async (email, educationId, educationDetails) => {
    const existingEducation = await Education.findOne({
        where: { id: educationId, userEmail: email }  // Use the email to verify ownership
    });

    if (!existingEducation) {
        throw new Error('Education record not found or you do not have permission to edit');
    }

    // Update the existing education entry
    const updatedEducation = await existingEducation.update(educationDetails);

    return updatedEducation
};

const getEducation = async (email) => {
    const educationList = await Education.findAll({ where: { userEmail: email } });

        if (!educationList || educationList.length === 0) {
            throw new Error('No education records found');
        }

        return educationList;
};

const deleteEducation = async (email, educationId) => {
    const education = await Education.findOne({ 
        where: { 
            id: educationId,  // Ensure the education ID matches
            userEmail: email   // Ensure the user owns this education record based on email
        }
    });

    if (!education) {
        throw new Error('Education record not found or you do not have permission to delete');
    }

    await education.destroy();
    return { message: 'Education record deleted successfully' };
};

module.exports = {
    createEducation, updateEducation, getEducation,deleteEducation,
};