import inicializaCadastro from './componentes/cadastro/CadastroClientes';
import criaTabela from './componentes/lista/listagem-cliente';

const rotas = {
  '/': criaTabela,
  '/cadastro': inicializaCadastro,
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
