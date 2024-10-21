const Experience = require('../models/experience');

const createExperience = async(email, experienceDetails) => {
    const { company, position, startDate, endDate, responsibilities } = experienceDetails;

    const newExperience = await Experience.create({
        userEmail: email,  // Store email instead of userId
            company,
            position,
            startDate,
            endDate,
            responsibilities
    });

    return newExperience;
};

const updateExperience = async(email, experienceId, experienceDetails) => {
    const existingExperience = await Experience.findOne({
        where: { id: experienceId, userEmail: email }  // Use the email to verify ownership
    });

    if (!existingExperience) {
        throw new Error('Experience record not found or you do not have permission to edit');
    }

    const updatedExperience = await existingExperience.update(experienceDetails);
    return updatedExperience
};

const getExperience = async(email) => {
    const experienceList = await Experience.findAll({ where: { userEmail: email } });

        if (!experienceList || experienceList.length === 0) {
            throw new Error('No experience records found');
        }

        return experienceList;
};

const deleteExperience = async(email, experienceId) => {
    const experience = await Experience.findOne({ 
        where: { 
            id: experienceId,  
            userEmail: email
        }
    });

    if (!experience) {
        throw new Error('Experience record not found or you do not have permission to delete');
    }

    await experience.destroy();
    return { message: 'Experience record deleted successfully' };
};

module.exports = {
    createExperience, updateExperience, getExperience, deleteExperience
};