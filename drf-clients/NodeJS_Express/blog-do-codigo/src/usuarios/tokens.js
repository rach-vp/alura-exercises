const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');
const blocklistAccessToken = require('../../redis/blocklist-access-token');
const { InvalidArgumentError } = require('../erros');

const verificaTokenNaBlockList = async (token, nome, blocklist) => {
  if (!blocklist) return;
  const temToken = await blocklist.contemToken(token);
  if (temToken) {
    throw new jwt.JsonWebTokenError(`${nome} inválido por logout`);
  }
};

const criaTokenJWT = (id, [tempoQuant, tempoUnidade]) => {
  const payload = { id };

  const token = jwt.sign(
    payload,
    process.env.CHAVE_JWT,
    { expiresIn: tempoQuant + tempoUnidade },
  );
  return token;
};

const verificaTokenJWT = async (token, nome, blocklist) => {
  await verificaTokenNaBlockList(token, nome,  blocklist);
  const { id } = jwt.verify(token, process.env.CHAVE_JWT);
  return id;
};

const invalidaTokenJWT = (token, blocklist) => {
  return blocklist.adiciona(token);
};

const criaTokenOpaco = async (id, [tempoQuant, tempoUnidade], lista) => {
  const tokenOpaco = crypto.randomBytes(24).toString('hex');
  const dataExpiracao = moment().add(tempoQuant, tempoUnidade).unix();
  await lista.adiciona(tokenOpaco, id, dataExpiracao);
  return tokenOpaco;
}

const verificaTokenOpaco = async (token, nome, allowlist) => {
  verificaTokenEnviado(token, nome);
  const id = await allowlist.buscaValor(token);
  verificaTokenValido(id, nome);
  return id;
};

const invalidaTokenOpaco = async (token, allowlist) => {
  await allowlist.delete(token);
};

function verificaTokenValido(id, nome) {
  if (!id) {
    throw new InvalidArgumentError(`${nome} inválido`);
  }
}

function verificaTokenEnviado(token, nome) {
  if (!token) {
    throw new InvalidArgumentError(`${nome} não enviado`);
  }
}

module.exports = {
  access: {
    nome: 'Access token',
    lista: blocklistAccessToken,
    expiracao: [15, 'm'],
    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },
    verifica(token) {
      return verificaTokenJWT(token, this.nome, this.lista);
    },
    invalida(token) {
      return invalidaTokenJWT(token, this.lista);
    },
  },
  refresh: {
    nome: 'Refresh token',
    lista: allowlistRefreshToken,
    expiracao: [15, 'm'],
    cria(id) {
      return criaTokenOpaco(id, this.expiracao, this.lista);
    },
    verifica(token) {
      return verificaTokenOpaco(token, this.nome, this.lista);
    },
    invalida(token) {
      return invalidaTokenOpaco(token, this.lista);
    },
  },
  verificacaoEmail: {
    nome: 'Token de verificação de e-mail',
    expiracao: [1, 'h'],
    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },
    verifica(token) {
      return verificaTokenJWT(token, this.expiracao);
    },
  },
};
