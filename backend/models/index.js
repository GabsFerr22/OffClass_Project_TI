const Usuario = require('./usuario');
const Instituicao = require('./instituicao');


Usuario.belongsTo(Instituicao, {
  foreignKey: 'codigo_escolar',
  targetKey: 'codigo_acesso',
  as: 'instituicao'
});

module.exports = { Usuario, Instituicao };
