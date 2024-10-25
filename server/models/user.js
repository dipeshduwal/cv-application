const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accentColor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    textColor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    font: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,  // OTP can be null if not generated
    },
    otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,  // Expiration date for OTP
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;
