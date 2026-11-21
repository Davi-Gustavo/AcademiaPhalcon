
import { useState } from "react";

function CadastroPlano({ atualizar }) {

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");
  const [erro, setErro] = useState("");

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/planos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          valor,
          duracao
        })
      });

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert("Plano cadastrado com sucesso!");

        setNome("");
        setValor("");
        setDuracao("");

        atualizar();
      } else {
        setErro(mensagem || "Erro ao cadastrar plano!");
      }

    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <div className="caixa-login">
      <h2>Cadastrar plano</h2>

      <form onSubmit={cadastrar}>
        <div className="campo">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome do plano"
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
          Cadastrar plano
        </button>
      </form>
    </div>
  );
}

export default CadastroPlano;
