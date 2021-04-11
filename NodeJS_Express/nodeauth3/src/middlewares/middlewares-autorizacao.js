const controle = require('../controle-de-acesso')

const metodos = {
  ler: {
    todos: 'readAny',
    proprio: 'readOwn'
  },
  criar: {
    todos: 'createAny',
    proprio: 'createOwn'
  },
  remover: {
    todos: 'deleteAny',
    proprio: 'deleteOwn'
  }
}

module.exports = (entidade, acao) => (req, res, next) => {
  const permissoesDoCargo = controle.can(req.user.cargo)
  const acoes = metodos[acao]

  const permissaoTodos = permissoesDoCargo[acoes.todos](entidade)
  const permissaoProprio = permissoesDoCargo[acoes.proprio](entidade)
  if (!permissaoTodos.granted && !permissaoProprio.granted) {
    res.status(403).end()
    return
  }

  req.acesso = {
    todos: {
      permitido: permissaoTodos.granted,
      atributos: permissaoTodos.attributes
    },
    proprio: {
      permitido: permissaoProprio.granted,
      atributos: permissaoProprio.attributes
    }
  }

  next()
}
