
function ExcluirAluno({ aluno, atualizar }) {

  async function excluir() {

    const confirmar = window.confirm(
      `Deseja realmente excluir o aluno ${aluno.nome}?`
    );

    if (!confirmar) {
      return;
    }

    try {

      const resposta = await fetch(
        `http://localhost:8000/alunos/${aluno.id}`,
        {
          method: "DELETE"
        }
      );

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {

        alert("Aluno excluído com sucesso!");

        atualizar();

      } else {

        alert(mensagem || "Erro ao excluir aluno!");

      }

    } catch (error) {

      console.error(error);
      alert("Erro ao conectar com o servidor!");

    }

  }

  return (

    <button type="button" onClick={excluir}>
      Excluir
    </button>

  );

}

export default ExcluirAluno;

