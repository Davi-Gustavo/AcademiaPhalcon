import { useState } from "react";
import CadastroMatricula from "./cadastroMatricula";
import ListaMatriculas from "./listaMatriculas";
import EditarMatricula from "./editarMatricula";

function GerenciarMatriculas() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [matriculaSelecionada, setMatriculaSelecionada] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);

  function atualizar() {
    setAtualizacao(atualizacao + 1);
  }

  return (
    <div>
      <h1>Gerenciar matrículas</h1>
      <p>Cadastre, consulte, edite e cancele matrículas.</p>

      {matriculaSelecionada ? (
        <EditarMatricula
          matricula={matriculaSelecionada}
          fechar={() => setMatriculaSelecionada(null)}
          atualizar={atualizar}
        />
      ) : (
        <>
          <button onClick={() => setMostrarCadastro(!mostrarCadastro)}>
            {mostrarCadastro ? "Fechar cadastro" : "Nova matrícula"}
          </button>

          {mostrarCadastro && (
            <CadastroMatricula atualizar={atualizar} />
          )}

          <ListaMatriculas
            atualizar={atualizacao}
            editar={(matricula) => {
              setMatriculaSelecionada(matricula);
              setMostrarCadastro(false);
            }}
          />
        </>
      )}
    </div>
  );
}

export default GerenciarMatriculas;