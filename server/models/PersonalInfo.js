const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const PersonalInfo = sequelize.define('PersonalInfo', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
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
        type: DataTypes.TEXT, // Store base64-encoded image
        allowNull: true,
    }
});

module.exports = PersonalInfo;
