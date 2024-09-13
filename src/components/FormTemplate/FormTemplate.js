import React from "react";

function FormTemplate({title, fields, data, setData, onSubmit}){
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

}