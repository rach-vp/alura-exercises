import criaTabela from './componentes/lista/listagem-cliente';
import inicializaCadastro from './componentes/cadastro/CadastroClientes';
import inicializaEdicao from './componentes/edita/EditaCliente';

const rotas = {
  '/': criaTabela,
  '/cadastro': inicializaCadastro,
  '/edita': inicializaEdicao,
}

const rootDiv = document.querySelector('[data-container]');

const navegacao = pathName => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  rootDiv.innerHTML = '';

  const iniciaRota = rotas[window.location.pathname];
  rootDiv.appendChild(iniciaRota());
}

window.navegacao = navegacao;

window.onpopstate = () => {
  rootDiv.innerHTML = '';
  rootDiv.appendChild(rotas[window.location.pathname]());
};

export default navegacao;
