const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Instituicao = require('../models/instituicao');

exports.registrar = async (req, res) => {
  const { nome, email, senha, codigo_escolar } = req.body;

  try {
    const instituicao = await Instituicao.findOne({ where: { codigo_acesso: codigo_escolar } });
    if (!instituicao) {
      return res.status(404).json({ erro: 'Código escolar inválido' });
    }

    const hash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hash,
      codigo_escolar,
    });

    res.status(201).json({ usuario });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, tipo: 'usuario' }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

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
