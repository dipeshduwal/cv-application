const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
    skillName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Skill;