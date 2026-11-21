
import { useState } from "react";

import CadastroPlano from "./cadastroPlano";
import ListaPlanos from "./listaPlanos";
import EditarPlano from "./editarPlano";

function GerenciarPlanos() {

  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);

  function atualizar() {
    setAtualizacao(atualizacao + 1);
  }

  function editar(plano) {
    setPlanoSelecionado(plano);
  }

  function fecharEdicao() {
    setPlanoSelecionado(null);
  }

  return (
    <div>

      <h1>Gerenciamento de Planos</h1>

      <p className="descricao">
        Cadastre, consulte e gerencie os planos da academia.
      </p>

      {planoSelecionado ? (

        <EditarPlano
          plano={planoSelecionado}
          fechar={fecharEdicao}
          atualizar={atualizar}
        />

      ) : mostrarCadastro ? (

        <CadastroPlano atualizar={atualizar} />

      ) : (

        <ListaPlanos
          key={atualizacao}
          atualizar={atualizar}
          editar={editar}
        />

      )}

      {!planoSelecionado && (

        <button
          onClick={() => setMostrarCadastro(!mostrarCadastro)}
        >
          {mostrarCadastro ? "Voltar para listagem" : "Cadastrar plano"}
        </button>

      )}

    </div>
  );
}

export default GerenciarPlanos;
