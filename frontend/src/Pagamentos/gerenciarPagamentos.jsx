
import { useState } from "react";
import CadastroPagamento from "./cadastroPagamento";
import ListaPagamentos from "./listaPagamentos";
import EditarPagamento from "./editarPagamento";

function GerenciarPagamentos() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [atualizacao, setAtualizacao] = useState(0);

  function atualizar() {
    setAtualizacao((valorAtual) => valorAtual + 1);
  }

  return (
    <div>
      <h1>Gerenciar pagamentos</h1>
      <p>Cadastre, consulte, edite e acompanhe os pagamentos da academia.</p>

      {pagamentoSelecionado ? (
        <EditarPagamento
          pagamento={pagamentoSelecionado}
          fechar={() => setPagamentoSelecionado(null)}
          atualizar={atualizar}
        />
      ) : (
        <>
          <button onClick={() => setMostrarCadastro(!mostrarCadastro)}>
            {mostrarCadastro ? "Fechar cadastro" : "Novo pagamento"}
          </button>

          {mostrarCadastro && (
            <CadastroPagamento atualizar={atualizar} />
          )}

          <ListaPagamentos
            atualizar={atualizacao}
            recarregar={atualizar}
            editar={(pagamento) => {
              setPagamentoSelecionado(pagamento);
              setMostrarCadastro(false);
            }}
          />
        </>
      )}
    </div>
  );
}

export default GerenciarPagamentos;
