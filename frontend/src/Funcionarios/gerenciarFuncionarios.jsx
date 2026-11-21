
import { useState } from "react";
import CadastroFuncionario from "./cadastroFuncionario";
import ListaFuncionarios from "./listaFuncionarios";
import EditarFuncionario from "./editarFuncionario";

function GerenciarFuncionarios() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);

  function atualizar() {
    setAtualizacao((valorAtual) => valorAtual + 1);
  }

  return (
    <div>
      <h1>Gerenciar funcionários</h1>
      <p>Cadastre, consulte, edite e exclua funcionários da academia.</p>

      {funcionarioSelecionado ? (
        <EditarFuncionario
          funcionario={funcionarioSelecionado}
          fechar={() => setFuncionarioSelecionado(null)}
          atualizar={atualizar}
        />
      ) : (
        <>
          <button onClick={() => setMostrarCadastro(!mostrarCadastro)}>
            {mostrarCadastro ? "Fechar cadastro" : "Novo funcionário"}
          </button>

          {mostrarCadastro && (
            <CadastroFuncionario atualizar={atualizar} />
          )}

          <ListaFuncionarios
            atualizar={atualizacao}
            recarregar={atualizar}
            editar={(funcionario) => {
              setFuncionarioSelecionado(funcionario);
              setMostrarCadastro(false);
            }}
          />
        </>
      )}
    </div>
  );
}

export default GerenciarFuncionarios;
