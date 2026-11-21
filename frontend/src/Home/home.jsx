
import { useEffect, useState } from "react";

function Home() {
  const [alunos, setAlunos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const [
          respostaAlunos,
          respostaMatriculas,
          respostaPagamentos,
          respostaPendentes
        ] = await Promise.all([
          fetch("http://localhost:8000/alunos"),
          fetch("http://localhost:8000/matriculas"),
          fetch("http://localhost:8000/pagamentos"),
          fetch("http://localhost:8000/pagamentos/pendentes")
        ]);

        if (
          !respostaAlunos.ok ||
          !respostaMatriculas.ok ||
          !respostaPagamentos.ok ||
          !respostaPendentes.ok
        ) {
          throw new Error("Erro ao carregar dados");
        }

        const dadosAlunos = await respostaAlunos.json();
        const dadosMatriculas = await respostaMatriculas.json();
        const dadosPagamentos = await respostaPagamentos.json();
        const textoPendentes = await respostaPendentes.text();

        const listaPendentes = textoPendentes
          .split(/<br\s*\/?>/i)
          .filter((item) => item.trim() !== "");

        setAlunos(dadosAlunos);
        setMatriculas(dadosMatriculas);
        setPagamentos(dadosPagamentos);
        setPendentes(listaPendentes);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os dados do Dashboard.");
      }
    }

    carregarDados();
  }, []);

  const matriculasAtivas = matriculas.filter(
    (matricula) => matricula.status === "ATIVA"
  );

  const recebimentos = pagamentos.reduce(
    (total, pagamento) => total + Number(pagamento.valor),
    0
  );

  const ultimosPagamentos = [...pagamentos]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-cabecalho">
        <h1>Dashboard</h1>
        <p>Bem-vindo à Academia Fácil!</p>
        <p>Acompanhe os principais dados da sua academia.</p>
      </div>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total de alunos</h3>
          <h2>{alunos.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Matrículas ativas</h3>
          <h2>{matriculasAtivas.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Recebimentos</h3>
          <h2>
            {recebimentos.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </h2>
        </div>

        <div className="dashboard-card">
          <h3>Mensalidades pendentes</h3>
          <h2>{pendentes.length}</h2>
        </div>
      </div>

      <div className="dashboard-lista">
        <h2>Últimos pagamentos</h2>

        {ultimosPagamentos.length === 0 ? (
          <p>Nenhum pagamento cadastrado.</p>
        ) : (
          ultimosPagamentos.map((pagamento) => (
            <div className="dashboard-pagamento" key={pagamento.id}>
              <div>
                <strong>Pagamento #{pagamento.id}</strong>
                <p>Vencimento: {pagamento.data_vencimento}</p>
              </div>

              <strong>
                {Number(pagamento.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
