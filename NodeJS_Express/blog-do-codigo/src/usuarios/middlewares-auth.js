const passport = require('passport');
const Usuario = require('./usuarios-modelo');
const tokens = require('./tokens');

module.exports = {
  local: (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      (erro, usuario, info) => {
        if (erro) {
          if (erro.name === 'InvalidArgumentError') {
            return res.status(401).json({ erro: erro.message });
          }
          return res.status(500).json({ erro: erro.message });
        }
        if (!usuario) {
          return res.status(401).json();
        }

        req.user = usuario;
        return next();
      }
    )(req, res, next);
  },
  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, usuario, info) => {
        if (error) {
          if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ erro: error.message });
          }
          if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ erro: error.message, expiradoEm: error.expiredAt });
          }
          return res.status(500).json({ erro: error.message });
        }
        if (!usuario) {
          return res.status(401).json();
        }

        req.token = info.token;
        req.user = usuario;
        return next();
      },
    )(req, res, next);
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const id = await tokens.refresh.verifica(refreshToken);
      await tokens.refresh.invalida(refreshToken);
      req.user = await Usuario.buscaPorId(id);
      return next();
    } catch (err) {
      if (err.name === 'InvalidArgumentError') {
        return res.status(401).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
  },
};
