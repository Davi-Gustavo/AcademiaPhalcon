
import { useEffect, useState } from "react";
import ExcluirAluno from "./excluirAluno";

function ListaAlunos({ atualizar, editar, recarregar }) {
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarAlunos() {
      try {
        const resposta = await fetch("http://localhost:8000/alunos");

        if (!resposta.ok) {
          throw new Error("Erro ao buscar alunos");
        }

        const dados = await resposta.json();
        setAlunos(dados);
        setErro("");
      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar alunos!");
      }
    }

    buscarAlunos();
  }, [atualizar]);

  return (
    <div className="secao-listagem">
      <h2>Alunos cadastrados</h2>

      <p className="descricao">
        Consulte os alunos registrados na academia.
      </p>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {alunos.length === 0 && !erro && (
        <p>Nenhum aluno cadastrado.</p>
      )}

      {alunos.map((aluno) => (
        <div key={aluno.id} className="card-item">
          <h3>{aluno.nome}</h3>

          <p><strong>CPF:</strong> {aluno.cpf}</p>
          <p><strong>Email:</strong> {aluno.email}</p>
          <p><strong>Telefone:</strong> {aluno.telefone}</p>

          <button onClick={() => editar(aluno)}>
            Editar
          </button>

          <ExcluirAluno
            aluno={aluno}
            atualizar={recarregar}
          />
        </div>
      ))}
    </div>
  );
}

export default ListaAlunos;
