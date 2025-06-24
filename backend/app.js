require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const instituicaoRoutes = require('./routes/instituicaoRoutes');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/instituicoes', instituicaoRoutes);

sequelize.sync().then(() => {
  console.log('✅ Banco de dados sincronizado');
  app.listen(3000, '0.0.0.0', () => console.log('🚀 Servidor rodando na porta 3000'));
});
