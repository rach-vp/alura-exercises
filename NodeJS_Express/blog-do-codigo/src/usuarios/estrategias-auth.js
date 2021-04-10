const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');
const blacklist = require('../../redis/manipula-blacklist');

const verificaUsuario = (usuario) => {
  if (!usuario) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail');
  }
};

const verificaTokenNaBlackList = async (token) => {
  const temToken = await blacklist.contemToken(token);
  if (temToken) {
    throw new jwt.JsonWebTokenError('Token inválido por logout');
  }
};

const verificaSenha = async (senha, senhaHash) => {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new InvalidArgumentError('E-mail ou senha inválidos');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: 'false',
    },
    async (email, senha, done) => {
      try {
        const usuario = await Usuario.buscaPorEmail(email);
        verificaUsuario(usuario);
        await verificaSenha(senha, usuario.senhaHash);
        done(null, usuario);
      } catch (err) {
        done(err);
      }
    },
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verificaTokenNaBlackList(token);
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const usuario = await Usuario.buscaPorId(payload.id);
        done(null, usuario, { token });
      } catch (err) {
        done(err);
      }
    }
  )
);
