import React, { useState } from "react";
import './formTemplate.css';

function FormTemplate({ title, fields, data, setData, onSubmit, handlePhotoChange }) {
    const [validationErrors, setValidationErrors] = useState({}); // Track validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone number validation to allow only numbers
        if (name === 'phone' && !/^\d*$/.test(value)) {
            return;  // If non-numeric input is entered, ignore it
        }

        setData(prevData => ({
            ...prevData, [name]: value
        }));

        // Clear validation error when user starts typing
        setValidationErrors(prevErrors => ({
            ...prevErrors, [name]: ""
        }));
    };

    const handleFileChange = (e) => {
        if (handlePhotoChange) {
            handlePhotoChange(e); // Call the photo change handler
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate required fields
        let newValidationErrors = {};
        fields.forEach(field => {
            if (field.required && !data[field.name]) {
                newValidationErrors[field.name] = `${field.label} is required`;
            }
        });

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors); // Set validation errors
            return; // Prevent form submission
        }

        onSubmit(data); // Submit the data if validation passes
    };

    return (
        <div className="form-container">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                {fields.map((field) => (
                    <div key={field.name} className="form-field">
                        <label htmlFor={field.name}>{field.label}</label>
                        {field.type === 'file' ? (
                            <input
                                type="file"
                                id={field.name}
                                name={field.name}
                                accept="image/jpeg,image/png"
                                onChange={handleFileChange}
                                className={validationErrors[field.name] ? "error" : ""}
                            />
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={data[field.name] || ''}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={field.required}
                                className={validationErrors[field.name] ? "error" : ""}
                            />
                        )}

                        {/* Show validation error message if there's an error */}
                        {validationErrors[field.name] && (
                            <div className="error-message1">{validationErrors[field.name]}</div>
                        )}
                    </div>
                ))}
                <button className="save-button1" type="submit">Save</button>
            </form>
        </div>
    );
}

export default FormTemplate;
