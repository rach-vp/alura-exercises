const passport = require('passport')
const Usuario = require('../usuarios/usuarios-modelo')
const tokens = require('../usuarios/tokens')

module.exports = {
  local (req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      (erro, usuario, info) => {
        if (erro) {
          return next(erro)
        }

        req.user = usuario
        req.authenticated = true
        return next()
      }
    )(req, res, next)
  },

  bearer (req, res, next) {
    passport.authenticate(
      'bearer',
      { session: false },
      (erro, usuario, info) => {
        if (erro) {
          next(erro)
        }

        req.token = info.token
        req.user = usuario
        req.authenticated = true
        return next()
      }
    )(req, res, next)
  },

  async refresh (req, res, next) {
    try {
      const { refreshToken } = req.body
      const id = await tokens.refresh.verifica(refreshToken)
      await tokens.refresh.invalida(refreshToken)
      req.user = await Usuario.buscaPorId(id)
      return next()
    } catch (erro) {
      next(erro)
    }
  },

  async verificacaoEmail (req, res, next) {
    try {
      const { token } = req.params
      const id = await tokens.verificacaoEmail.verifica(token)
      const usuario = await Usuario.buscaPorId(id)
      req.user = usuario
      next()
    } catch (erro) {
      if (erro) {
        next(erro)
      }

      return res.status(500).json({ erro: erro.message })
    }
  }
}
