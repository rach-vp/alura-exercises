const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
const blacklist = require('../../redis/manipula-blacklist');
const allowListRefreshToken = require('../../redis/allowlist-refresh-token');

const criaTokenJWT = ({ id }) => {
  const payload = { id };

  const token = jwt.sign(
    payload,
    process.env.CHAVE_JWT,
    { expiresIn: '15m' },
  );
  return token;
};

const criaTokenOpaco = async (usuario) => {
  const tokenOpaco = crypto.randomBytes(24).toString('hex');
  const dataExpiracao = moment().add(5, 'd').unix();
  await allowListRefreshToken.adiciona(tokenOpaco, usuario.id, dataExpiracao);
  return tokenOpaco;
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email
      });

      await usuario.adicionaSenha(senha);

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  login: async (req, res) => {
    try {
      const accessToken = criaTokenJWT(req.user);
      const refreshToken = await criaTokenOpaco(req.user);
      res.set('Authorization', accessToken);
      res.status(200).json({ refreshToken });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.token;
      await blacklist.adiciona(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
};
