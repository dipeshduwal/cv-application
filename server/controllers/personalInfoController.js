const fs = require('fs');
const path = require('path');
const PersonalInfo = require('../models/personalInfo');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostInfo = async (req, res) => {
    try {
        const { fullName, personalEmail, phone, address, birthDate, linkedIn } = req.body;

        // Extract the user's email from the authenticated token
        const { email: userEmail } = req.user;

        // Find existing personal info based on the user's unique email (from the token)
        const existingInfo = await PersonalInfo.findOne({ where: { userEmail } });

        let previousPhotoPath = null;

        // If there's existing personal info, check if the photo path exists
        if (existingInfo && existingInfo.photo) {
            previousPhotoPath = existingInfo.photo;
            console.log(`Previous photo path:`, previousPhotoPath);
        }

        let photoPath = null;

        // Check if a file was uploaded
        if (req.files && req.files.profileImage) {
            const file = req.files.profileImage;
            const uploadPath = path.join(__dirname, '../uploads/', file.name);

            // Move file to the server file system
            await file.mv(uploadPath); // Using await to ensure the file is moved before proceeding

            // Save relative file path to the database
            photoPath = `/uploads/${file.name}`;
        }

        // If there's a previous photo, delete it if it exists
        if (previousPhotoPath) {
            const previousPhotoFullPath = path.join(__dirname, '../uploads/', path.basename(previousPhotoPath));

            // Check if the previous photo file exists before trying to delete it
            fs.access(previousPhotoFullPath, fs.constants.F_OK, (err) => {
                if (!err) {
                    // If the file exists, delete it
                    fs.unlink(previousPhotoFullPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Failed to delete previous photo:', unlinkErr);
                        } else {
                            console.log('Previous photo deleted successfully:', previousPhotoFullPath);
                        }
                    });
                } else {
                    console.warn('Previous photo does not exist, skipping deletion:', previousPhotoFullPath);
                }
            });
        }

        // Check if the user already has personal info
        if (existingInfo) {
            // Update existing info
            await PersonalInfo.update(
                {
                    fullName,
                    personalEmail,
                    phone,
                    address,
                    birthDate,
                    linkedIn,
                    photo: photoPath || existingInfo.photo, // Update photo only if new one is uploaded
                },
                { where: { userEmail } }
            );
            console.log('Personal info updated for user:', userEmail);
        } else {
            // Create new personal info
            await PersonalInfo.create({
                userEmail, // Ensure personal info is linked to the authenticated user
                fullName,
                personalEmail,
                phone,
                address,
                birthDate,
                linkedIn,
                photo: photoPath, // Set new photo if uploaded
            });
            console.log('New personal info created for user:', userEmail);
        }

        // Fetch updated info and return in the response
        const updatedInfo = await PersonalInfo.findOne({ where: { userEmail } });
        res.status(201).json(updatedInfo);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
    }
};


exports.GetInfo = async (req, res) => {
    try {
        // Extract the user's email from the authenticated token
        const { email: userEmail } = req.user;

        // Find personal info based on the user's email
        const personalInfo = await PersonalInfo.findOne({ where: { userEmail } });
        if (!personalInfo) {
            return res.status(404).json({ message: 'Personal info not found.' });
        }
        res.status(200).json(personalInfo);
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.DeleteInfo = async (req, res) => {
    try {
        // Extract the user's email from the authenticated token
        const { email: userEmail } = req.user;

        // Delete personal info based on the user's email
        const result = await PersonalInfo.destroy({ where: { userEmail } });
        
        if (result) {
            res.status(200).json({ message: 'Personal info deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Personal info not found.' });
        }
    } catch (error) {
        handleServerError(res, error);
    }
};
