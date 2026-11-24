import { useEffect, useState } from "react";
import ExcluirMatricula from "./excluirMatricula";

function ListaMatriculas({ atualizar, editar }) {
  const [matriculas, setMatriculas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarMatriculas() {
    try {
      const [respostaMatriculas, respostaAlunos, respostaPlanos] =
        await Promise.all([
          fetch("http://localhost:8000/matriculas"),
          fetch("http://localhost:8000/alunos"),
          fetch("http://localhost:8000/planos")
        ]);

      if (
        !respostaMatriculas.ok ||
        !respostaAlunos.ok ||
        !respostaPlanos.ok
      ) {
        throw new Error("Erro ao carregar os dados.");
      }

      const dadosMatriculas = await respostaMatriculas.json();
      const dadosAlunos = await respostaAlunos.json();
      const dadosPlanos = await respostaPlanos.json();

      setMatriculas(dadosMatriculas);
      setAlunos(dadosAlunos);
      setPlanos(dadosPlanos);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível carregar as matrículas.");
    }
  }

  async function cancelar(id) {
    if (!window.confirm("Deseja cancelar esta matrícula?")) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:8000/matriculas/${id}/cancelar`,
        { method: "PUT" }
      );

      const mensagem = await resposta.text();
      alert(mensagem);

      if (resposta.ok && mensagem.toLowerCase().includes("sucesso")) {
        await carregarMatriculas();
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor!");
    }
  }

  useEffect(() => {
    carregarMatriculas();
  }, [atualizar]);

  return (
    <div>
      <h2>Lista de matrículas</h2>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {matriculas.length === 0 && !erro && (
        <p>Nenhuma matrícula cadastrada.</p>
      )}

      {matriculas.map((matricula) => {
        const aluno = alunos.find(
          (item) => Number(item.id) === Number(matricula.aluno_id)
        );

        const plano = planos.find(
          (item) => Number(item.id) === Number(matricula.plano_id)
        );

        return (
          <div className="card-item" key={matricula.id}>
            <h3>Matrícula #{matricula.id}</h3>

            <p>
              <strong>Aluno:</strong>{" "}
              {aluno ? aluno.nome : "Aluno não encontrado"}
            </p>

            <p>
              <strong>Plano:</strong>{" "}
              {plano ? plano.nome : "Plano não encontrado"}
            </p>

            <p>Início: {matricula.data_inicio}</p>
            <p>Fim: {matricula.data_fim || "Não informado"}</p>
            <p>Status: {matricula.status}</p>

            <button onClick={() => editar(matricula)}>
              Editar
            </button>

            {matricula.status === "ATIVA" && (
              <button onClick={() => cancelar(matricula.id)}>
                Cancelar matrícula
              </button>
            )}

            <ExcluirMatricula
              matricula={matricula}
              atualizar={carregarMatriculas}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListaMatriculas;