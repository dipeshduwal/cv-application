import React, {useState} from "react";

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

    return (
        <div className="skill-section">
            <div className="skill-list">
                {Skills.map((skl, index) => (
                    <ItemTemplate 
                        key={index}
                        title={skl.skillName}
                    />
                
                ))}
            </div>
        </div>
    );



}