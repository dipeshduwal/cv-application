const fs = require('fs');
const path = require('path');
const PersonalInfo = require('../models/personalInfo');

// Save uploaded photo and return the relative path
const savePhoto = async (file, userEmail) => {

    // Log the userEmail for debugging purposes
    console.log('Saving photo for user email:', userEmail);

    // Check if the user exists in the database
    const personalInfo = await PersonalInfo.findOne({ where: { userEmail } });
    if (!personalInfo) {
        throw new Error('User not found. Cannot save photo.');
    }
     // Sanitize email to make it a valid file name (replace invalid characters)
     const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, '_');
    
     // Get the original file extension (e.g., '.jpg', '.png')
     const fileExtension = path.extname(file.name);
     
     // Create new file name using the sanitized email
     const newFileName = `${sanitizedEmail}${fileExtension}`;
    const uploadPath = path.join(__dirname, '../uploads/', newFileName);
    await file.mv(uploadPath);
    return `/uploads/${newFileName}`;
};

// Delete a photo if it exists on the server
const deletePhoto = (photoPath) => {
    const fullPath = path.join(__dirname, '../uploads/', path.basename(photoPath));
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(fullPath, (unlinkErr) => {
                if (unlinkErr) console.error('Failed to delete photo:', unlinkErr);
                else console.log('Photo deleted successfully:', fullPath);
            });
        } else {
            console.warn('Photo not found, skipping deletion:', fullPath);
        }
    });
};

// Create or update personal info
const createOrUpdateInfo = async (userEmail, info, file) => {
    const existingInfo = await PersonalInfo.findOne({ where: { userEmail } });

    let photoPath = null;
    if (file) photoPath = await savePhoto(file);

    if (existingInfo) {
        if (existingInfo.photo && photoPath) deletePhoto(existingInfo.photo);

        await existingInfo.update({
            ...info,
            photo: photoPath || existingInfo.photo,
        });
        console.log('Personal info updated for:', userEmail);
    } else {
        await PersonalInfo.create({ userEmail, ...info, photo: photoPath });
        console.log('New personal info created for:', userEmail);
    }

    return await PersonalInfo.findOne({ where: { userEmail } });
};

// Retrieve personal info
const getInfo = async (userEmail) => {
    const personalInfo = await PersonalInfo.findOne({ where: { userEmail } });
    if (!personalInfo) {
        return null;
    }
    return personalInfo;
};

// Delete personal info
const deleteInfo = async (userEmail) => {
    const result = await PersonalInfo.destroy({ where: { userEmail } });
    if (!result) throw new Error('Personal info not found');
    return { message: 'Personal info deleted successfully' };
};

module.exports = {
    createOrUpdateInfo,
    getInfo,
    deleteInfo,
};
