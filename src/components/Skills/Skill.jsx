import React, {useState} from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import ItemTemplate from "../FormTemplate/ItemTemplate";
import '../../styles/Buttons.css'

function Skill({skills, setSkills}){
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [skill, setSkill] = useState({
        skillName: ''
    });

    const fields = [
        {name:'skillName', type:'text', label:'Skill', placeholder:'Enter Skill', required: true}
    ];

    const handleSubmit = (data) => {
        if(editingIndex !== null){
            const newSkills = [...skills];
            newSkills[editingIndex] = data;
            setSkills(newSkills);
            setEditingIndex(null)
        } else {
            setSkills([...skills, data]);
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setSkill(skills[index]);
        setEditingIndex(index);
        setShowForm(true);
    }

    const handleDelete = (index) => {
        const newExperiences = skills.filter((_, i) => i !== index);
        setSkills(newExperiences);
    };

    const resetForm = () => {
        setSkill({
            skillName: '',
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
    };

    return (
        <div className="skill-section">
            <div className="skill-list">
                {skills.map((skl, index) => (
                    <ItemTemplate 
                        key={index}
                        title={skl.skillName}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                
                ))}
            </div>
            {showForm ? (
                <div>
                    <FormTemplate
                        title={editingIndex !== null ? "Edit Skill" : "Add Skill"}
                        fields={fields}
                        data={skill}
                        setData={setSkill}
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

export default Skill;