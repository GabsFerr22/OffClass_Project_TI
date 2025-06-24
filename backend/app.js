require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const instituicaoRoutes = require('./routes/instituicaoRoutes');
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/instituicoes', instituicaoRoutes);

// Porta dinâmica (para Railway) ou 3000 local
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('✅ Banco de dados sincronizado');
  app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
}).catch((err) => {
  console.error('❌ Erro ao sincronizar o banco de dados:', err);
});
