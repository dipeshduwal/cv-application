import React, {useState, useEffect} from "react";
import { fetchSkills, addSkill, updateSkill, deleteSkill } from "../../api/skillApi";
import FormTemplate from "../formTemplate/formTemplate";
import ItemTemplate from "../formTemplate/itemTemplate";
import '../../styles/buttons.css'

function Skill({skills, setSkills, visibleSkills, setVisibleSkills}){
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [skill, setSkill] = useState({
        skillName: '',
        rating: 5,
    });

    const fields = [
        {name:'skillName', type:'text', label:'Skill', placeholder:'Enter Skill', required: true},
        { name: 'rating', type: 'number', label: 'Rating (1-5)', min: 1, max: 5, required: true }
    ];

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const data = await fetchSkills();
                setSkills(data);
                const initialVisibility = data.reduce((acc, skl) => {
                    acc[skl.id] = true;
                    return acc;
                }, {});
                setVisibleSkills(initialVisibility);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        loadSkills();
    }, [setSkills, setVisibleSkills]);

    const handleSubmit = async (data) => {
        try {
            if (editingIndex !== null) {
                const updatedSkill = await updateSkill(skills[editingIndex].id, data);
                const newSkills = [...skills];
                newSkills[editingIndex] = updatedSkill;
                setSkills(newSkills);
                setEditingIndex(null);
            } else {
                const newSkill = await addSkill(data);
                setSkills([...skills, newSkill]);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting skill entry:', error);
        }
    };

    const handleEdit = (index) => {
        setSkill({ 
            skillName: skills[index].skillName, 
            rating: skills[index].rating,
            skillId: skills[index].id 
        });
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        try {
            await deleteSkill(skills[index].id);
            const newSkills = skills.filter((_, i) => i !== index);
            setSkills(newSkills);
        } catch (error) {
            console.error('Error deleting skill entry:', error);
        }
    };

    const resetForm = () => {
        setSkill({
            skillName: '',
            rating: 5
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
    };

    const toggleVisibility = (id) => {
        setVisibleSkills((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="skill-section">
            <div className="skill-list">
                {skills.map((skl, index) => (
                    <ItemTemplate 
                        key={skl.id}
                        title={skl.skillName}
                        rating={skl.rating}
                        type="skill"
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                        isVisible={visibleSkills[skl.id]}
                        onToggleVisibility={() => toggleVisibility(skl.id)}
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