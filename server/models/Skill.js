const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Skill = sequelize.define('Skill', {
    skillName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Skill;