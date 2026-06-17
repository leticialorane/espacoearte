document.addEventListener("DOMContentLoaded", () => {

  // ALTERAR STATUS
  document.querySelectorAll(".status").forEach(status => {

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

    });

  });

  // EXCLUIR CLIENTE
  document.querySelectorAll(".ti-trash").forEach(botao => {

    botao.addEventListener("click", () => {

      const linha = botao.closest("tr");

      if (confirm("Deseja excluir este cliente?")) {
        linha.remove();
      }

    });

  });

  // EDITAR CLIENTE
  document.querySelectorAll(".ti-pencil").forEach(botao => {

    botao.addEventListener("click", () => {

      const linha = botao.closest("tr");

      const nome =
        linha.querySelector("strong").textContent;

      const novoNome =
        prompt("Editar nome do cliente:", nome);

      if (novoNome && novoNome.trim() !== "") {

        linha.querySelector("strong").textContent =
          novoNome;

      }

    });

  });

});