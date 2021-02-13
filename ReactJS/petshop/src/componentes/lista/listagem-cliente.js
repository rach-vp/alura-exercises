import { deletaCliente, listarClientes } from "../../api/cliente.js";
import "../../assets/css/clientes.css";

const removeCliente = (id) => {
  if (confirm("Deseja deletar o cliente ?")) {
    deletaCliente(id);
    window.location.reload();
  }
};

const exibeCliente = (cpf, nome, id) => {
  const linha = document.createElement("tr");

  const conteudoLinha = `
  <td>${cpf}</td>
  <td>${nome}</td>
  <button type="button" class="btn btn-danger" onclick="removeCliente(${id})">Excluir</button>
  <a href="./componentes/edita/edita-clientes.html?id=${id}">
  <button type=""button class="btn btn-info">Editar</button>
  </a>
  `;

  linha.innerHTML = conteudoLinha;
  return linha;
};

const corpoTabela = () => {
  const corpoTabela = document.createElement("tbody");
  listarClientes().then((exibe) =>
    exibe.forEach(({ cpf, nome, id }) =>
      corpoTabela.appendChild(exibeCliente(cpf, nome, id))
    )
  );
  return corpoTabela;
};

const criaTabela = () => {
  const tabela = document.createElement("table");

  const cabecalho = `
  <thead class="thead-dark">
  <tr>
  <th scope="col">CPF</th>
  <th scope="col">Nome</th>
  <th scope="col"></th>
  <th scope="col">
    <a class="btn btn-primary" onclick="navegacao('/cadastro'); return false;" >Novo Cliente</a>
  </th>
  </tr>
  </thead>
  `;
  tabela.innerHTML = cabecalho;
  tabela.classList.add("table");
  tabela.appendChild(corpoTabela());
  return tabela;
};

export default criaTabela;
