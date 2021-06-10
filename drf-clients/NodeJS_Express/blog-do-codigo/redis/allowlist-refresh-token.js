const redis = require('redis');
const manipulaLsita = require('./manipula-lista');

const allowlist = redis.createClient(
  { prefix: 'allowlist-refresh-token:' },
);

module.exports = manipulaLsita(allowlist);
