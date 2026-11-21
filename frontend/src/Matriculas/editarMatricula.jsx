import { useState } from "react";

function EditarMatricula({ matricula, fechar, atualizar }) {
  const [aluno_id, setAlunoId] = useState(matricula.aluno_id);
  const [plano_id, setPlanoId] = useState(matricula.plano_id);
  const [data_inicio, setDataInicio] = useState(matricula.data_inicio);
  const [data_fim, setDataFim] = useState(matricula.data_fim || "");
  const [erro, setErro] = useState("");

  async function editar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch(
        `http://localhost:8000/matriculas/${matricula.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aluno_id,
            plano_id,
            data_inicio,
            data_fim
          })
        }
      );

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert(mensagem);
        atualizar();
        fechar();
      } else {
        setErro(mensagem);
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <form className="formulario" onSubmit={editar}>
      <h2>Editar matrícula</h2>

      <div className="campo">
        <label>ID do aluno</label>
        <input
          type="number"
          min="1"
          value={aluno_id}
          onChange={(e) => setAlunoId(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>ID do plano</label>
        <input
          type="number"
          min="1"
          value={plano_id}
          onChange={(e) => setPlanoId(e.target.value)}
          required
        />
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

      <button type="submit">Salvar alterações</button>
      <button type="button" onClick={fechar}>Voltar</button>
    </form>
  );
}

export default EditarMatricula;