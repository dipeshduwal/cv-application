const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
    skillName: {
        type: DataTypes.STRING,
        allowNull: false,
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

module.exports = Skill;