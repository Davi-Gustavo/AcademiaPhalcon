
function ExcluirFuncionario({ funcionario, atualizar }) {
  async function excluir() {
    if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:8000/funcionarios/${funcionario.id}`,
        { method: "DELETE" }
      );

      const mensagem = await resposta.text();
      alert(mensagem);

      if (mensagem.toLowerCase().includes("sucesso")) {
        atualizar();
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

export default ExcluirFuncionario;
