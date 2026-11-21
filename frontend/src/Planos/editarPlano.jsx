
import { useState } from "react";

function EditarPlano({ plano, fechar, atualizar }) {

  const [nome, setNome] = useState(plano.nome);
  const [valor, setValor] = useState(plano.valor);
  const [duracao, setDuracao] = useState(plano.duracao);
  const [erro, setErro] = useState("");

  async function editar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch(
        `http://localhost:8000/planos/${plano.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome,
            valor,
            duracao
          })
        }
      );

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert("Plano atualizado com sucesso!");

        atualizar();
        fechar();

      } else {
        setErro(mensagem || "Erro ao atualizar plano!");
      }

    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <div className="caixa-login">

      <h2>Editar plano</h2>

      <form onSubmit={editar}>

        <div className="campo">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Valor (R$)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Duração (meses)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            required
          />
        </div>

        {erro && <p>{erro}</p>}

        <button type="submit">
          Salvar alterações
        </button>

        <button type="button" onClick={fechar}>
          Cancelar
        </button>

      </form>

    </div>
  );
}

export default EditarPlano;
