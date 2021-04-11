const Post = require('./posts-modelo')
const { InvalidArgumentError } = require('../erros')
const ConversorPost = require('../converters')

module.exports = {
  async adiciona (req, res) {
    try {
      req.body.autor = req.user.id
      const post = new Post(req.body)
      await post.adiciona()

      res.status(201).json(post)
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message })
      }
      res.status(500).json({ erro: erro.message })
    }
  },

  async lista (req, res) {
    try {
      let posts = await Post.listarTodos()
      const conversor = new ConversorPost('json')

      if (!req.authenticated) {
        posts = posts.map(({ titulo, conteudo }) => ({
          titulo,
          conteudo: conteudo.substring(0, 10) + ' ...Inscreva-se para ler o restante do post'
        }))
      }

      res.send(conversor.converter(posts))
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async obterDetalhes (req, res) {
    try {
      const post = await Post.buscaPorId(req.params.id, req.user.id)
      res.json(post)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async remover (req, res) {
    try {
      let post
      if (req.acesso.todos.permitido) {
        post = await Post.buscaPorId(req.params.id, req.user.id)
      } else if (req.acesso.proprio.permitido) {
        post = await Post.buscaPorId(req.params.id, req.user.id)
      }

      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }
}
