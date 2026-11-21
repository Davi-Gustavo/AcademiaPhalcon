
import { useState } from "react";

function CadastroAluno({atualizar}) {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  async function cadastrar(e) {

    e.preventDefault();
    setErro("");

    try {

      const resposta = await fetch("http://localhost:8000/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          cpf,
          email,
          telefone
        })
      });

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {

        alert("Aluno cadastrado com sucesso!");

        setNome("");
        setCpf("");
        setEmail("");
        setTelefone("");

        atualizar();

      } else {

        setErro(mensagem || "Erro ao cadastrar aluno!");

      }

    } catch (error) {

      console.error(error);
      setErro("Erro ao conectar com o servidor!");

    }

  }

  return (

    <div className="caixa-login">

      <h2>Cadastrar aluno</h2>

      <p className="descricao">
        Preencha os dados do aluno.
      </p>

      <form onSubmit={cadastrar}>

        <div className="campo">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Digite o telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        {erro && (
          <p className="mensagem-erro">{erro}</p>
        )}

        <button type="submit">
          Cadastrar aluno
        </button>

      </form>

    </div>

  );

}

export default CadastroAluno;
