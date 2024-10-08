const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PersonalInfo = sequelize.define('PersonalInfo', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    personalEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    linkedIn: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'email',
        },
        
    },
});

module.exports = PersonalInfo;
