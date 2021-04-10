const { promisify } = require('util');
module.exports = lista => {
  const setAsync = promisify(lista.set).bind(lista);
  const existsAsync = promisify(lista.exists).bind(lista);
  const getAsync = promisify(lista.get).bind(lista);
  const delAsync = promisify(lista.del).bind(lista);

  return {
    async adiciona(chave, valor, dataExpiracao) {
      await setAsync(chave, valor);
      lista.expireat(chave, dataExpiracao);
    },
    async buscaValor(chave) {
      return await  getAsync(chave);
    },
    async contemChave(chave) {
      const result = await existsAsync(chave);
      return result === 1;
    },
    async delete(chave) {
      return await delAsync(chave);
    },
  }
}