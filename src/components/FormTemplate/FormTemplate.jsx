import React from "react";
import './FormTemplate.css';

//form template to handle the input fields/generate form template
//lifting the state as props to give control to parent component - parent controls onSubmit
function FormTemplate({title, fields, data, setData, onSubmit}){
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        // Phone number validation to allow only numbers
        if (name === 'phone' && !/^\d*$/.test(value)) {
            return;  // If non-numeric input is entered, ignore it
        }

        setData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents the default form submission behavior (which would reload the page).
         // Perform required field validation manually
        const missingFields = fields.filter(field => field.required && !data[field.name]);
        if (missingFields.length > 0) {
            alert(`Please fill out the required fields: ${missingFields.map(field => field.label).join(", ")}`);
            return; // Prevent form submission
        }
        onSubmit(data);
    };

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                {fields.map((field) => (
                    <div key={field.name} className="form-field">
                        <label htmlFor={field.name}>{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea
                            //passing hardcoded data from common parent
                                id={field.name}
                                name={field.name}
                                value={data[field.name] || ''}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={field.required}
                                autoComplete="off"
                            />
                        ): field.type === 'date-month'? (
                            <input
                                type="month"
                                id={field.name}
                                name={field.name}
                                value={data[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                autoComplete="off"
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
                                autoComplete="new-password"
                            />
                        )}
                    
                    </div>
                ))}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default FormTemplate;