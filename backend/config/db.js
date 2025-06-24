require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,         // 'railway'
  process.env.DB_USER,         // 'root'
  process.env.DB_PASSWORD,     // senha
  {
    host: process.env.DB_HOST, // 'crossover.proxy.rlwy.net'
    port: process.env.DB_PORT, // '21618'
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
