const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// ▶️ Registrar usuário (sem código escolar)
exports.registrar = async (req, res) => {
  const { nome, email, senha, numero, cpf } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hash,
      numero,
      cpf,
    });

    res.status(201).json({ usuario });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// ▶️ Login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Email não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    const token = jwt.sign({ id: usuario.id, tipo: 'usuario' }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// ▶️ Atualizar perfil (exemplo opcional)
exports.atualizarPerfil = async (req, res) => {
  try {
    const { school } = req.body;
    let imagem = null;

    if (req.file) {
      imagem = req.file.filename;
    }

    await Usuario.update(
      { escola: school, imagemPerfil: imagem },
      { where: { id: req.userId } }
    );

    return res.json({ mensagem: 'Perfil atualizado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao atualizar perfil' });
  }
};
