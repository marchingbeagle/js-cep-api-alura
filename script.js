const inputCEP = document.querySelector("#cep");

inputCEP.addEventListener("focusout", () => {
  buscaCEP(inputCEP.value);
});

async function buscaCEP(cep) {
  try {
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error("Cep não existente");
    }
    autoPreenchimentoEndereco(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    trataErro();
  }
}

function autoPreenchimentoEndereco(consultaCEPConvertida) {
  const cidade = document.querySelector("#cidade");
  const estado = document.querySelector("#estado");
  const logradouro = document.querySelector("#endereco");
  const bairro = document.querySelector("#bairro");
  document.querySelector(".erro").innerHTML = "";

  cidade.value = consultaCEPConvertida.localidade;
  estado.value = consultaCEPConvertida.uf;
  logradouro.value = consultaCEPConvertida.logradouro;
  bairro.value = consultaCEPConvertida.bairro;
}

function trataErro() {
  const divErro = document.createElement("div");
  divErro.classList.add("erro");
  document.querySelector("#cep").parentElement.appendChild(divErro);
  document.querySelector(".erro").innerHTML =
    "<p> CEP inválido, tente novamente! </p>";
}
