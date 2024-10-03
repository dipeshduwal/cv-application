import React, { useEffect, useState } from "react";
import FormTemplate from "../formTemplate/formTemplate";

function PersonalInfo({ personalInfo, setPersonalInfo }) {
    const fields = [
        { name: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Enter your phone number', required: true },
        { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter your address', required: true },
        { name: 'birthDate', type: 'date', label: 'Date of Birth', placeholder: 'Select your date of birth', required: true },
        { name: 'linkedIn', type: 'url', label: 'LinkedIn Profile', placeholder: 'Enter your LinkedIn profile URL' },
        { name: 'photo', type: 'file', label: 'Upload Photo', accept: 'image/*' }
    ];

    const [selectedPhoto, setSelectedPhoto] = useState(null); // Track the selected file

    // Fetch personal info on mount
    const fetchPersonalInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/infos');
            const data = await response.json();
            setPersonalInfo(data);
        } catch (error) {
            console.error("Error fetching personal info:", error);
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

        // Format the birthDate to 'yy-mm-dd'
        if (data.birthDate) {
            data.birthDate = formatDate(data.birthDate);
        }

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
            const response = await fetch('http://localhost:5000/infos', {
                method: 'POST',
                body: formData,
            });

            // Handle the response and set the updated personal info
            if (response.ok) {
                const updatedPersonalInfo = await response.json();
                setPersonalInfo(updatedPersonalInfo);
                // Clear selected photo after upload
                setSelectedPhoto(null);
                // Re-fetch the updated data after successful submission
                await fetchPersonalInfo();  // Ensure the data is refreshed after submitting
            } else {
                const errorData = await response.json();
                console.error("Error submitting personal info:", errorData);
            }
        } catch (error) {
            console.error("Error submitting personal info:", error);
        }
    };

    // Handle photo change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedPhoto(file); // Update the selected photo file
        }
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
            />
        </div>
    );
}

export default PersonalInfo;
