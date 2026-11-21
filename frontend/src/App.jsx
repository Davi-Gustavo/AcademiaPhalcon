
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem("logado");
    navigate("/");
  }

  return (
    <div className="layout-academia">
      <nav className="menu-academia">
        <Link to="/academia">Início</Link>
        <Link to="/academia/alunos">Alunos</Link>
        <Link to="/academia/planos">Planos</Link>
        <Link to="/academia/matriculas">Matrículas</Link>
        <Link to="/academia/pagamentos">Pagamentos</Link>
        <Link to="/academia/funcionarios">Funcionários</Link>

        <button onClick={sair}>Sair</button>
      </nav>

      <main className="conteudo-academia">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
