
import { useEffect, useState } from "react";
import ExcluirFuncionario from "./excluirFuncionario";

function ListaFuncionarios({ atualizar, recarregar, editar }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarFuncionarios() {
    try {
      const resposta = await fetch("http://localhost:8000/funcionarios");
      const dados = await resposta.json();

      setFuncionarios(dados);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível carregar os funcionários.");
    }
  }

  useEffect(() => {
    carregarFuncionarios();
  }, [atualizar]);

  return (
    <div>
      <h2>Lista de funcionários</h2>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {funcionarios.length === 0 && !erro && (
        <p>Nenhum funcionário cadastrado.</p>
      )}

      {funcionarios.map((funcionario) => (
        <div className="card-item" key={funcionario.id}>
          <h3>{funcionario.nome}</h3>

          <p>CPF: {funcionario.cpf}</p>
          <p>Email: {funcionario.email}</p>
          <p>Telefone: {funcionario.telefone}</p>
          <p>Cargo: {funcionario.cargo}</p>

          <button onClick={() => editar(funcionario)}>
            Editar
          </button>

          <ExcluirFuncionario
            funcionario={funcionario}
            atualizar={recarregar}
          />
        </div>
      ))}
    </div>
  );
}

export default ListaFuncionarios;
