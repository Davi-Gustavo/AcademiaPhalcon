
import { useEffect, useState } from "react";
import ExcluirPagamento from "./excluirPagamento";

function ListaPagamentos({ atualizar, editar, recarregar }) {
  const [pagamentos, setPagamentos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const [
        respostaPagamentos,
        respostaMatriculas,
        respostaAlunos,
        respostaPlanos
      ] = await Promise.all([
        fetch("http://localhost:8000/pagamentos"),
        fetch("http://localhost:8000/matriculas"),
        fetch("http://localhost:8000/alunos"),
        fetch("http://localhost:8000/planos")
      ]);

      if (
        !respostaPagamentos.ok ||
        !respostaMatriculas.ok ||
        !respostaAlunos.ok ||
        !respostaPlanos.ok
      ) {
        throw new Error("Erro ao carregar os dados.");
      }

      const dadosPagamentos = await respostaPagamentos.json();
      const dadosMatriculas = await respostaMatriculas.json();
      const dadosAlunos = await respostaAlunos.json();
      const dadosPlanos = await respostaPlanos.json();

      setPagamentos(dadosPagamentos);
      setMatriculas(dadosMatriculas);
      setAlunos(dadosAlunos);
      setPlanos(dadosPlanos);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível carregar os pagamentos.");
    }
  }

  async function carregarPendentes() {
    try {
      const resposta = await fetch(
        "http://localhost:8000/pagamentos/pendentes"
      );

      const texto = await resposta.text();

      const lista = texto
        .split(/<br\s*\/?>/i)
        .filter((item) => item.trim() !== "");

      setPendentes(lista);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    carregarDados();
    carregarPendentes();
  }, [atualizar]);

  return (
    <div>
      <h2>Lista de pagamentos</h2>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {pagamentos.length === 0 && !erro && (
        <p>Nenhum pagamento cadastrado.</p>
      )}

      {pagamentos.map((pagamento) => {
        const matricula = matriculas.find(
          (item) =>
            Number(item.id) === Number(pagamento.matricula_id)
        );

        const aluno = matricula
          ? alunos.find(
              (item) =>
                Number(item.id) === Number(matricula.aluno_id)
            )
          : null;

        const plano = matricula
          ? planos.find(
              (item) =>
                Number(item.id) === Number(matricula.plano_id)
            )
          : null;

        return (
          <div className="card-item" key={pagamento.id}>
            <h3>Pagamento #{pagamento.id}</h3>

            <p>
              <strong>Aluno:</strong>{" "}
              {aluno ? aluno.nome : "Aluno não encontrado"}
            </p>

            <p>
              <strong>Plano:</strong>{" "}
              {plano ? plano.nome : "Plano não encontrado"}
            </p>

            <p>
              <strong>Matrícula:</strong>{" "}
              {matricula
                ? `#${matricula.id}`
                : "Matrícula não encontrada"}
            </p>

            <p>Valor: R$ {pagamento.valor}</p>
            <p>Data do pagamento: {pagamento.data_pagamento}</p>
            <p>Vencimento: {pagamento.data_vencimento}</p>
            <p>Forma de pagamento: {pagamento.forma_pagamento}</p>

            <button onClick={() => editar(pagamento)}>
              Editar
            </button>

            <ExcluirPagamento
              pagamento={pagamento}
              atualizar={recarregar}
            />
          </div>
        );
      })}

      <h2>Mensalidades pendentes</h2>

      {pendentes.length === 0 ? (
        <p>Nenhuma mensalidade pendente encontrada.</p>
      ) : (
        pendentes.map((item, index) => (
          <div className="card-item" key={index}>
            <p>{item}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaPagamentos;
