import React, { useEffect, useState } from "react";
import axios from 'axios';
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

    const [selectedPhoto, setSelectedPhoto] = useState(null); // Track the selected file
    const [photoError, setPhotoError] = useState(''); 

    // Fetch personal info on mount
    const fetchPersonalInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/infos', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Add token for authentication if needed
                }
            });

            setPersonalInfo(response.data);
        } catch (error) {
            console.error("Error fetching personal info:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchPersonalInfo();
    }, [setPersonalInfo]);

    // Handle date formatting
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2); // Last two digits of year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (data) => {
        const formData = new FormData();

        // Append text fields to formData
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        // Append the selected photo file to formData if it exists
        if (selectedPhoto) {
            formData.append('profileImage', selectedPhoto); // 'profileImage' should match the server-side field
        }

        try {
            const response = await axios.post('http://localhost:5000/infos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Add token for authentication if needed
                },
            });

            // Handle the response and set the updated personal info
            if (response.status === 201) {
                setPersonalInfo(response.data);
                // Clear selected photo after upload
                setSelectedPhoto(null); // Re-fetch the updated data after successful submission
                setPhotoError(''); // Clear any previous error message
                fetchPersonalInfo(); 
            }
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
