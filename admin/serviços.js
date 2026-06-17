/* ================================================
   CLIENTES.JS
   Demonstração local sem API
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {

  registrarEventos();
  atualizarKPIs();

});

/* ================================================
   EVENTOS
   ================================================ */

function registrarEventos() {

  ativarStatus();
  ativarExcluir();
  ativarEditar();
  ativarBusca();
  ativarNovoCliente();

}

/* ================================================
   NOVO CLIENTE
   ================================================ */

function ativarNovoCliente() {

  const botao = document.querySelector(".btn-novo-cliente");

  if (!botao) return;

  botao.addEventListener("click", () => {

    const nome = prompt("Nome do cliente:");
    if (!nome) return;

    const email = prompt("E-mail:");
    if (!email) return;

    const telefone = prompt("Telefone:");
    if (!telefone) return;

    const tbody = document.querySelector(".clientes-tabela tbody");

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        <strong>${nome}</strong>
        <span>${email}</span>
      </td>

      <td>${telefone}</td>

      <td>${new Date().toLocaleDateString('pt-BR')}</td>

      <td>
        <span class="status status-ativo">
          Ativo
        </span>
      </td>

      <td class="acoes">
        <i class="ti ti-pencil"></i>
        <i class="ti ti-trash"></i>
        <i class="ti ti-dots-vertical"></i>
      </td>
    `;

    tbody.appendChild(linha);

    registrarEventos();
    atualizarKPIs();

  });

}

/* ================================================
   EDITAR CLIENTE
   ================================================ */

function ativarEditar() {

  document.querySelectorAll(".ti-pencil").forEach(botao => {

    if (botao.dataset.evento) return;

    botao.dataset.evento = "true";

    botao.addEventListener("click", () => {

      const linha = botao.closest("tr");

      const nomeAtual =
        linha.querySelector("strong").textContent;

      const emailAtual =
        linha.querySelector("span").textContent;

      const telefoneAtual =
        linha.children[1].textContent;

      const novoNome =
        prompt("Editar nome:", nomeAtual);

      if (!novoNome) return;

      const novoEmail =
        prompt("Editar e-mail:", emailAtual);

      if (!novoEmail) return;

      const novoTelefone =
        prompt("Editar telefone:", telefoneAtual);

      if (!novoTelefone) return;

      linha.querySelector("strong").textContent =
        novoNome;

      linha.querySelector("span").textContent =
        novoEmail;

      linha.children[1].textContent =
        novoTelefone;

    });

  });

}

/* ================================================
   EXCLUIR CLIENTE
   ================================================ */

function ativarExcluir() {

  document.querySelectorAll(".ti-trash").forEach(botao => {

    if (botao.dataset.evento) return;

    botao.dataset.evento = "true";

    botao.addEventListener("click", () => {

      const linha = botao.closest("tr");

      const nome =
        linha.querySelector("strong").textContent;

      const confirmar =
        confirm(`Excluir ${nome}?`);

      if (!confirmar) return;

      linha.remove();

      atualizarKPIs();

    });

  });

}

/* ================================================
   ALTERAR STATUS
   ================================================ */

function ativarStatus() {

  document.querySelectorAll(".status").forEach(status => {

    if (status.dataset.evento) return;

    status.dataset.evento = "true";

    status.style.cursor = "pointer";

    status.addEventListener("click", () => {

      if (status.classList.contains("status-ativo")) {

        status.classList.remove("status-ativo");
        status.classList.add("status-inativo");
        status.textContent = "Inativo";

      } else {

        status.classList.remove("status-inativo");
        status.classList.add("status-ativo");
        status.textContent = "Ativo";

      }

      atualizarKPIs();

    });

  });

}

/* ================================================
   BUSCA
   ================================================ */

function ativarBusca() {

  const campo =
    document.querySelector(".clientes-busca input");

  if (!campo) return;

  campo.addEventListener("input", () => {

    const termo =
      campo.value.toLowerCase();

    document
      .querySelectorAll(".clientes-tabela tbody tr")
      .forEach(linha => {

        const texto =
          linha.textContent.toLowerCase();

        linha.style.display =
          texto.includes(termo)
            ? ""
            : "none";

      });

  });

}

/* ================================================
   KPIs DINÂMICOS
   ================================================ */

function atualizarKPIs() {

  const linhas =
    document.querySelectorAll(
      ".clientes-tabela tbody tr"
    );

  const total = linhas.length;

  const ativos =
    document.querySelectorAll(
      ".status-ativo"
    ).length;

  const inativos =
    document.querySelectorAll(
      ".status-inativo"
    ).length;

  const cards =
    document.querySelectorAll(".card-kpi-value");

  if (cards.length >= 4) {

    cards[0].textContent = total;
    cards[1].textContent = ativos;
    cards[3].textContent = inativos;

  }

}