import React, { useEffect, useState } from "react";
import { fetchPersonalInfos, createOrUpdate } from "../../api/personalInfoApi";
import FormTemplate from "../formTemplate/formTemplate";

function PersonalInfo({ personalInfo, setPersonalInfo }) {
    const fields = [
        { name: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { name: 'personalEmail', type: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Enter your phone number', required: true },
        { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter your address', required: true },
        { name: 'birthDate', type: 'date', label: 'Date of Birth', placeholder: 'Select your date of birth', required: true },
        { name: 'linkedIn', type: 'url', label: 'LinkedIn Profile', placeholder: 'Enter your LinkedIn profile URL' },
        { name: 'photo', type: 'file', label: 'Upload Photo', accept: 'image/*' }
    ];

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoError, setPhotoError] = useState(''); 

    useEffect(() => {
        const loadPersonalInfos = async () => {
            try {
                const data = await fetchPersonalInfos();
                setPersonalInfo(data);
            } catch (error) {
                console.error("Error fetching personal info:", error.response?.data || error.message);
            }
        };
        loadPersonalInfos();
    }, [setPersonalInfo]);

    const handleSubmit = async (data) => {
        const formData = new FormData();

        // Append fields to formData
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        // Append selected photo if available
        if (selectedPhoto) {
            formData.append('profileImage', selectedPhoto);
        }

        try {
            const updatedInfo = await createOrUpdate(formData);
            setPersonalInfo(updatedInfo);
            setSelectedPhoto(null);  // Reset photo after successful upload
            setPhotoError('');
        } catch (error) {
            console.error("Error submitting personal info:", error.response?.data || error.message);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
    
        // Check file size (e.g., limit to 2MB)
        const MAX_SIZE = 2 * 1024 * 1024; // 2MB
        if (file.size > MAX_SIZE) {
            setPhotoError("File size exceeds 2MB.");
            return;
        }
    
        // Check file type (e.g., allow only JPEG and PNG)
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!ALLOWED_TYPES.includes(file.type)) {
            setPhotoError("Only JPEG and PNG files are allowed.");
            return;
        }

        setSelectedPhoto(file); // Update the selected photo file
        setPhotoError(''); // Clear any previous error message
    };

    return (
        <div className="personal-info">
            <FormTemplate
                title="Personal Information"
                fields={fields}
                data={personalInfo}
                setData={setPersonalInfo}
                onSubmit={handleSubmit}
                handlePhotoChange={handlePhotoChange}
                photoError={photoError}
            />
        
        </div>
    );
}

export default PersonalInfo;
