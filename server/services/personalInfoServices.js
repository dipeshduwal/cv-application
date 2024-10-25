const fs = require('fs');
const path = require('path');
const PersonalInfo = require('../models/personalInfo');

// Save uploaded photo and return the relative path
const savePhoto = async (file, userEmail) => {

    // Check if the user exists in the database
    const personalInfo = await PersonalInfo.findOne({ where: { userEmail } });
    if (!personalInfo) {
        throw new Error('User not found. Cannot save photo.');
    }

    // Get the user's full name and sanitize it to make it a valid file name
    const sanitizedFullName = personalInfo.fullName.replace(/[^a-zA-Z0-9]/g, '_');
    const uploadDir = path.join(__dirname, '../uploads/');
    const possibleExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    // Check and delete any existing file with different extensions for this user
    for (const ext of possibleExtensions) {
        const existingFilePath = path.join(uploadDir, `${sanitizedFullName}${ext}`);
        if (fs.existsSync(existingFilePath)) {
            fs.unlinkSync(existingFilePath);
        }
    }

     // Get the original file extension (e.g., '.jpg', '.png')
    const fileExtension = path.extname(file.name);
     
     // Create new file name using the sanitized fullname
    const newFileName = `${sanitizedFullName}${fileExtension}`;
    const uploadPath = path.join(uploadDir, newFileName);
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

const createOrUpdateInfo = async (userEmail, info, file) => {
    const existingInfo = await PersonalInfo.findOne({ where: { userEmail } });

    let photoPath = existingInfo ? existingInfo.photo : null; // Preserve the existing photo path if no new file

    if (file) {
        // Overwrite the old image by using the same filename
        photoPath = await savePhoto(file, userEmail); 
    }

    if (existingInfo) {
        await existingInfo.update({
            ...info,
            photo: photoPath, // Update with the new or existing photo path
        });
    } else {
        await PersonalInfo.create({ userEmail, ...info, photo: photoPath });
    }

    // Append a timestamp query parameter to force reload
    const updatedInfo = await PersonalInfo.findOne({ where: { userEmail } });
    updatedInfo.photo += `?t=${new Date().getTime()}`;

    return updatedInfo;
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
