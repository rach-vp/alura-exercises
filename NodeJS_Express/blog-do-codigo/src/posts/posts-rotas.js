const postsControlador = require('./posts-controlador');
const middlewaresAuth = require('../usuarios/middlewares-auth');

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(
      middlewaresAuth.bearer,
      postsControlador.adiciona,
    );
};
