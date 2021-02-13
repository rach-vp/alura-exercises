import validaCPF from "../valida/validaCPF";
import { editaCliente, detalhaCliente } from "../../api/cliente";

const alerta = (classe, mensagem) => {
  const linha = document.createElement("section");
  const conteudoLinha = `<div class="${classe}">${mensagem}</div>`;
  linha.innerHTML = conteudoLinha;
  return linha;
};

const eventoEdita = (form) => {
  const pegaURL = new URL(window.location);
  const id = pegaURL.searchParams.get("id");
  const form = document.querySelector("[data-form]");
  const inputCPF = document.querySelector("[data-cpf]");
  const inputNome = document.querySelector("[data-nome]");

  detalhaCliente(id).then((dados) => {
    inputCPF.value = dados[0].cpf;
    inputNome.value = dados[0].nome;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    !validaCPF(inputCPF.value)
      ? window.alert("ESSE CPF NÃO EXISTE")
      : editaCliente(id, inputCPF.value, inputNome.value)
          .then(() =>
            formEdicao.appendChild(
              alerta("alert alert-success", "CLIENTE EDITADO COM SUCESSO !")
            )
          )
          .catch(() =>
            formEdicao.appendChild(
              alerta("alert alert-warning", "O CLIENTE NÃO PODE SER EDITADO !")
            )
          );
  });
};

export default eventoEdita;
