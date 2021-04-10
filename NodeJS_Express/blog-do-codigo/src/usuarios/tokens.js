const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const allowListRefreshToken = require('../../redis/allowlist-refresh-token');
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');

const criaTokenJWT = (id, [tempoQuant, tempoUnidade]) => {
  const payload = { id };

  const token = jwt.sign(
    payload,
    process.env.CHAVE_JWT,
    { expiresIn: tempoQuant + tempoUnidade },
  );
  return token;
};

const criaTokenOpaco = async (id, [tempoQuant, tempoUnidade], lista) => {
  const tokenOpaco = crypto.randomBytes(24).toString('hex');
  const dataExpiracao = moment().add(tempoQuant, tempoUnidade).unix();
  await lista.adiciona(tokenOpaco, id, dataExpiracao);
  return tokenOpaco;
}

module.exports = {
  access: {
    expiracao: [15, 'm'],
    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },
  },
  refresh: {
    lista: allowlistRefreshToken,
    expiracao: [15, 'm'],
    cria(id) {
      return criaTokenOpaco(id, this.expiracao, this.lista);
    },
  },
};
