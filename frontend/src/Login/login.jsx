
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function logar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        localStorage.setItem("logado", email);
        navigate("/academia");
      } else {
        setErro(mensagem || "Email ou senha inválidos!");
      }

    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <div className="pagina-login">

      <form className="caixa-login" onSubmit={logar}>

        <h1>Academia Fácil</h1>

        <p className="subtitulo">
          Sistema de gerenciamento de academia
        </p>

        <h2>Bem-vindo!</h2>

        <p className="descricao">
          Entre com seus dados para continuar.
        </p>

        <div className="campo">
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <button type="submit">
          Entrar
        </button>

        <p className="texto-alternativo">
          Não tem uma conta?{" "}
          <Link to="/cadastro">Criar conta</Link>
        </p>

      </form>

    </div>
  );
}
