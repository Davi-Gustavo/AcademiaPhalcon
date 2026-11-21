
function ExcluirPagamento({ pagamento, atualizar }) {
  async function excluir() {
    if (!window.confirm("Tem certeza que deseja excluir este pagamento?")) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:8000/pagamentos/${pagamento.id}`,
        { method: "DELETE" }
      );

      const mensagem = await resposta.text();

      if (!resposta.ok) {
        alert(mensagem || "Erro ao excluir pagamento!");
        return;
      }

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert(mensagem);
        atualizar();
      } else {
        alert(mensagem || "Não foi possível excluir o pagamento.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor!");
    }
  }

  return (
    <button onClick={excluir}>
      Excluir
    </button>
  );
}

export default ExcluirPagamento;
