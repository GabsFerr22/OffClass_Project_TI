module.exports = function gerarCodigoUnico() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ex: '485122'
};
