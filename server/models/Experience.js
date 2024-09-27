const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Experience = sequelize.define('Experience', {
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
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
    responsibilities: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
});

module.exports = Experience;
