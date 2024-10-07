const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Education = sequelize.define('Education', {
    school: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    userEmail: {
        type: DataTypes.STRING,  // Store the email of the user
        allowNull: false,
        references: {
            model: 'Users',  // Ensure this references the User model's email
            key: 'email',
        },
    },
});

module.exports = Education;
