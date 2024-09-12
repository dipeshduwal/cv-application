import React, {useState} from "react";

function Skill({Skills, setSkills}){
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [skill, setSkill] = useState({
        skillName: ''
    });

    const fields = [
        {name:'skillName', type:'text', label:'Skill', placeholder:'Enter Skill', required: true}
    ];

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