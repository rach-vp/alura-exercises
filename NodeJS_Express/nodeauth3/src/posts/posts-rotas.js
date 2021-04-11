const postsControlador = require('./posts-controlador')
const middlewaresAutenticacao = require('../middlewares/middlewares-autenticacao')
const middlewaresAutorizacao = require('../middlewares/middlewares-autorizacao')
const noAuth = require('../middlewares/no-auth')
const noAuthorizationRequired = require('../middlewares/no-authorization-required')

module.exports = app => {
  app
    .route('/post')
    .get(
      [noAuth, noAuthorizationRequired('post', 'ler')],
      postsControlador.lista
    )
    .post(
      [
        middlewaresAutenticacao.bearer,
        middlewaresAutorizacao('post', 'criar')
      ],
      postsControlador.adiciona
    )

  app.route('/post/:id')
    .get(
      [
        middlewaresAutenticacao.bearer,
        middlewaresAutorizacao('post', 'ler')
      ],
      postsControlador.obterDetalhes
    )
    .delete(
      [
        middlewaresAutenticacao.bearer,
        middlewaresAutorizacao('post', 'remover')
      ],
      postsControlador.remover
    )
}
