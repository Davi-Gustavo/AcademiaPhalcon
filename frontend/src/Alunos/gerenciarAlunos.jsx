
import { useState } from "react";
import CadastroAluno from "./cadastroAluno";
import ListaAlunos from "./listaAlunos";
import EditarAluno from "./editarAluno";

function GerenciarAlunos() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);

  function atualizar() {
    setAtualizacao((valorAtual) => valorAtual + 1);
  }

  return (
    <div>
      <h1>Gerenciamento de Alunos</h1>

      <p className="descricao">
        Cadastre e consulte os alunos da academia.
      </p>

      {alunoSelecionado ? (
        <EditarAluno
          aluno={alunoSelecionado}
          fechar={() => setAlunoSelecionado(null)}
          atualizar={atualizar}
        />
      ) : (
        <>
          <button onClick={() => setMostrarCadastro(!mostrarCadastro)}>
            {mostrarCadastro ? "Voltar para listagem" : "Cadastrar aluno"}
          </button>

          {mostrarCadastro ? (
            <CadastroAluno atualizar={atualizar} />
          ) : (
            <ListaAlunos
              atualizar={atualizacao}
              editar={(aluno) => {
                setAlunoSelecionado(aluno);
                setMostrarCadastro(false);
              }}
              recarregar={atualizar}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GerenciarAlunos;
