
import { useState } from "react";

function EditarAluno({ aluno, fechar, atualizar }) {

  const [nome, setNome] = useState(aluno.nome);
  const [cpf, setCpf] = useState(aluno.cpf);
  const [email, setEmail] = useState(aluno.email);
  const [telefone, setTelefone] = useState(aluno.telefone);
  const [erro, setErro] = useState("");

  async function editar(e) {

    e.preventDefault();
    setErro("");

    try {

      const resposta = await fetch(
        `http://localhost:8000/alunos/${aluno.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome,
            cpf,
            email,
            telefone
          })
        }
      );

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {

        alert("Aluno atualizado com sucesso!");

        atualizar();
        fechar();

      } else {

        setErro(mensagem || "Erro ao atualizar aluno!");

      }

    } catch (error) {

      console.error(error);
      setErro("Erro ao conectar com o servidor!");

    }

  }

  return (

    <div className="caixa-login">

      <h2>Editar aluno</h2>

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
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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

export default EditarAluno;
