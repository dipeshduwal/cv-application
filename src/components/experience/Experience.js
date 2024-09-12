import React, {useState} from "react";

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
        {name:'position', type:'text', label:'Position Name', placeholder:'Enter Position Name', required: true},
        {name:'startDate', type:'date-month', label:'Date of Joining', placeholder:'Enter Joining Date', required: true},
        {name:'endDate', type:'date-month', label:'Date of Ending', placeholder:'Enter Ending Date'},
        {name:'responsibilities', type:'text', label:'Company Name', placeholder:'Enter Company Name', required: true},
    ];

}

