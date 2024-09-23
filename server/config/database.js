const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.cvapp, process.env.cvapp, process.env.cvapp, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
