
import { useEffect, useState } from "react";

function CadastroMatricula({ atualizar }) {
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]);

  const [aluno_id, setAlunoId] = useState("");
  const [plano_id, setPlanoId] = useState("");
  const [data_inicio, setDataInicio] = useState("");
  const [data_fim, setDataFim] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const respostaAlunos = await fetch("http://localhost:8000/alunos");
        const respostaPlanos = await fetch("http://localhost:8000/planos");

        if (!respostaAlunos.ok || !respostaPlanos.ok) {
          throw new Error("Erro ao carregar dados.");
        }

        const dadosAlunos = await respostaAlunos.json();
        const dadosPlanos = await respostaPlanos.json();

        setAlunos(dadosAlunos);
        setPlanos(dadosPlanos);
      } catch (err) {
        console.error(err);
        setErro("Não foi possível carregar alunos e planos.");
      }
    }

    carregarDados();
  }, []);

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/matriculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aluno_id,
          plano_id,
          data_inicio,
          data_fim
        })
      });

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert(mensagem);

        setAlunoId("");
        setPlanoId("");
        setDataInicio("");
        setDataFim("");

        atualizar();
      } else {
        setErro(mensagem);
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <form className="formulario" onSubmit={cadastrar}>
      <h2>Cadastrar matrícula</h2>

      <div className="campo">
        <label>Aluno</label>
        <select
          value={aluno_id}
          onChange={(e) => setAlunoId(e.target.value)}
          required
        >
          <option value="">Selecione um aluno</option>

          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label>Plano</label>
        <select
          value={plano_id}
          onChange={(e) => setPlanoId(e.target.value)}
          required
        >
          <option value="">Selecione um plano</option>

          {planos.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.nome} - R$ {plano.valor}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label>Data de início</label>
        <input
          type="date"
          value={data_inicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>Data de término</label>
        <input
          type="date"
          value={data_fim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <button type="submit">Cadastrar matrícula</button>
    </form>
  );
}

export default CadastroMatricula;
