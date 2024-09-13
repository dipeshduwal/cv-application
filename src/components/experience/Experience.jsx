import React, {useState} from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import ItemTemplate from "../FormTemplate/ItemTemplate";
import '../../styles/Buttons.css';

function Experience({experiences,setExperiences}) {
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [experience, setExperience] = useState({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
    });

    const fields = [
        {name:'company', type:'text', label:'Company Name', placeholder:'Enter Company Name', required: true},
        {name:'position', type:'text', label:'Position Name', placeholder:'Enter Job Title', required: true},
        {name:'startDate', type:'date-month', label:'Date of Joining', placeholder:'Select Joining Date', required: true},
        {name:'endDate', type:'date-month', label:'Date of Ending', placeholder:'Select Ending Date'},
        {name:'responsibilities', type:'textarea', label:'Responsibilities', placeholder:'Describe your key responsibilities'}
    ];

    const handleSubmit = (data) => {
        if (editingIndex !== null){
            const newExperiences = [...experiences];
            newExperiences[editingIndex] = data;
            setExperiences(newExperiences);
            setEditingIndex(null);
        } else{
            setExperiences([...experiences, data]);
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setExperience(experiences[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const newExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(newExperiences);
    };

    const resetForm = () => {
        setExperience({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            responsibilities: ''
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
    };

    return(
        <div className="experience-section">
            <div className="experience-list">
                {experiences.map((exp, index) => (
                    <ItemTemplate
                        key={index}
                        title={`${exp.position} at ${exp.company}`}
                        subtitle={`${exp.startDate} - ${exp.endDate || 'Present'}`}
                        description={exp.responsibilities}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}

            </div>
            {showForm ? (
                <div>
                    <FormTemplate
                        title={editingIndex !== null ? "Edit Work Experience" : "Add Work Experience"}
                        fields={fields}
                        data={experience}
                        setData={setExperience}
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

    );

}

export default Experience;

