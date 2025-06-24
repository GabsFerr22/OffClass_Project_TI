const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Instituicao = sequelize.define('Instituicao', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  cnpj: { type: DataTypes.STRING, unique: true },
  senha: DataTypes.STRING,
});

module.exports = Instituicao;
