require('dotenv').config()

const app = require('./app')
const port = 3000
require('./database')
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')

const routes = require('./rotas')
routes(app)

app.use((req, res, next) => {
  res.set({ 'Content-Type': 'application/json' })
  next()
})

const {
  InvalidArgumentError,
  NotFound,
  Unauthorized
} = require('./src/erros')
const jwt = require('jsonwebtoken')

app.use((erro, req, res, next) => {
  let status
  const corpo = {
    mensagem: erro.message
  }
  switch (erro.constructor) {
    case InvalidArgumentError:
    case jwt.JsonWebTokenError:
    case Unauthorized:
      status = 401
      break
    case jwt.TokenExpiredError:
      status = 401
      corpo.expiradoEm = erro.expiredAt
      break
    case NotFound:
      status = 404
      break
    default:
      status = 500
      break
  }
  res.status(status).json(corpo)
})

app.listen(port, () => console.log('A API está funcionando!'))
