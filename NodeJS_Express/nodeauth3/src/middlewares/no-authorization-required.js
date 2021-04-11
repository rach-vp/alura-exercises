const middlewaresAutorizacao = require('./middlewares-autorizacao')

module.exports = (entidade, acao) => (req, res, next) => {
  if (req.autheticated) {
    return middlewaresAutorizacao(entidade, acao)(req, res, next)
  }

  next()
}
