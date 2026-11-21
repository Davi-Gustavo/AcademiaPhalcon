function ExcluirMatricula({ matricula, atualizar }) {
  async function excluir() {
    if (!window.confirm("Tem certeza que deseja excluir esta matrícula?")) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:8000/matriculas/${matricula.id}`,
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

export default ExcluirMatricula;