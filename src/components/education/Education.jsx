import React, {useState} from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import ItemTemplate from "../FormTemplate/ItemTemplate";
import '../../styles/Buttons.css';

function Education({educations, setEducations}){
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [education, setEducation] = useState({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    );

    const fields = [
        {name: 'school', type:'text', label:'School', placeholder:'Enter School Name', required: true},
        {name: 'degree', type:'text', label:'Degree', placeholder:'Enter Degree Name', required: true},
        {name: 'fieldOfStudy', type:'text', label:'Field Of Study', placeholder:'Enter field of study', required: true},
        {name: 'startDate', type:'date-month', label:'Start Date', placeholder:'Select start date', required: true},
        {name: 'endDate', type:'date-month', label:'End Date', placeholder:'Select end date'},
        {name: 'description', type:'textarea', label:'Description', placeholder:'Describe your education'}
    ];

    const handleSubmit = (data) => {
        if (editingIndex !== null){
            const newEducations = [...educations]; 
            newEducations[editingIndex] = data; //updating existing entry
            setEducations(newEducations);
            setEditingIndex(null);
        } else {
            setEducations([...educations, data]); //adding entry
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setEducation(educations[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const newEducations = educations.filter((_, i) => i !== index);
        setEducations(newEducations);
    };

    const resetForm = () => {
        setEducation({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: ''
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
    };


    return(
        <div className="education-section">
            <div className="education-list">
                {educations.map((edu, index) => (
                    <ItemTemplate
                        key={index}
                        title={`${edu.degree} in ${edu.fieldOfStudy}`}
                        subtitle={`${edu.school} (${edu.startDate} - ${edu.endDate || 'Present'})`}
                        description={edu.description}
                        //passing an event handler down as a prop
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))

                }
            </div>
            {showForm ? (
                <div className="form-container">
                    <FormTemplate
                        title={editingIndex !== null ? "Edit Education" : "Add Education"}
                        fields={fields}
                        data={education}
                        setData={setEducation}
                        onSubmit={handleSubmit}
                    />
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            ) : (
                <button className="new-entry-button" onClick={() => setShowForm(true)}>
                    New Entry
                </button>
            )}
        </div>
    )

};

export default Education;




