
import { useState } from "react";

function CadastroFuncionario({ atualizar }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [erro, setErro] = useState("");

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cpf,
          email,
          telefone,
          cargo
        })
      });

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert(mensagem);
        setNome("");
        setCpf("");
        setEmail("");
        setTelefone("");
        setCargo("");
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
      <h2>Cadastrar funcionário</h2>

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
        <label>CPF</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="000.000.000-00"
          required
        />
      </div>

      <div className="campo">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>Telefone</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Cargo</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
        />
      </div>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <button type="submit">Cadastrar funcionário</button>
    </form>
  );
}

export default CadastroFuncionario;
