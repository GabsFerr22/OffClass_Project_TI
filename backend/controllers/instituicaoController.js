const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Instituicao } = require('../models/instituicao');
const gerarCodigoUnico = require('../utils/generateCode');

exports.registrar = async (req, res) => {
  const { nome, email, cnpj, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    const codigo_acesso = gerarCodigoUnico();

    const instituicao = await Instituicao.create({
      nome,
      email,
      cnpj,
      senha: hash,
      codigo_acesso,
    });

    res.status(201).json({ instituicao });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.login = async (req, res) => {
  const { email_ou_cnpj, senha } = req.body;

  try {
    const instituicao = await Instituicao.findOne({
      where: {
        [Op.or]: [
          { email: email_ou_cnpj },
          { cnpj: email_ou_cnpj }
        ]
      }
    });

    if (!instituicao || !(await bcrypt.compare(senha, instituicao.senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: instituicao.id, tipo: 'instituicao' }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, instituicao });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
