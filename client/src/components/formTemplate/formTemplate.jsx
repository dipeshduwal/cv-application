import React, { useState } from "react";
import './formTemplate.css';

function FormTemplate({ title, fields, data, setData, onSubmit, handlePhotoChange, photoError, children }) {
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone' && !/^\d*$/.test(value)) {
            return;
        }

        const formattedValue =
            name === 'rating'
                ? Math.min(Math.max(Number(value), 1), 5) || ''
                : value;

        setData(prevData => ({
            ...prevData, [name]: formattedValue
        }));

        setValidationErrors(prevErrors => ({
            ...prevErrors, [name]: ""
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePhotoChange(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newValidationErrors = {};
        fields.forEach(field => {
            if (field.required && !data[field.name]) {
                newValidationErrors[field.name] = `${field.label} is required`;
            }
        });

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            return;
        }

        onSubmit(data);
    };

    return (
        <div className="form-container">
            <h2>Enter Your Personal Data:</h2>
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

                        {validationErrors[field.name] && (
                            <div className="error-message1">{validationErrors[field.name]}</div>
                        )}
                    </div>
                ))}
                {photoError && <p className="error-message1">{photoError}</p>}
                <div className="button-group">
                    <button className="save-button1" type="submit">
                        Save
                    </button>
                    {children}
                </div>
            </form>
        </div>
    );
};

export default FormTemplate;
