class ConversorPost {
  constructor (contentType) {
    this.contentType = contentType
    this.camposPublicos = ['titulo', 'conteudo']
  }

  filtrarDados (dados) {
    const obj = {}

    this.camposPublicos.forEach((campo) => {
      if (Reflect.has(dados, campo)) {
        obj[campo] = dados[campo]
      }
    })

    return obj
  }

  filtrar (dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((dado) => this.filtrarDados(dado))
    } else {
      dados = this.filtrarDados(dados)
    }

    return dados
  }

  converter (dados) {
    dados = this.filtrar(dados)
    if (this.contentType === 'json') {
      return JSON.stringify(dados)
    }
  }
}

module.exports = ConversorPost
