class InvalidArgumentError extends Error {
  constructor (mensagem) {
    super(mensagem)
    this.name = 'InvalidArgumentError'
  }
}

class InternalServerError extends Error {
  constructor (mensagem) {
    super(mensagem)
    this.name = 'InternalServerError'
  }
}

class NotFound extends Error {
  constructor (entidade) {
    super()
    this.name = 'NotFound'
    this.message = `Não foi possível encontrar ${entidade}`
  }
}

class Unauthorized extends Error {
  constructor () {
    super()
    this.name = 'Unauthorized'
    this.message = 'Operação não autorizada'
  }
}

module.exports = {
  InvalidArgumentError,
  InternalServerError,
  NotFound,
  Unauthorized
}
