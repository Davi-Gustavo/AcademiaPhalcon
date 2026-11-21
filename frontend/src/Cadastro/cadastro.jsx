
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Cadastro() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        setErro(mensagem || "Erro ao cadastrar!");
      }

    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <div className="pagina-login">

      <form className="caixa-login" onSubmit={cadastrar}>

        <h1>Academia Fácil</h1>

        <p className="subtitulo">
          Sistema de gerenciamento de academia
        </p>

        <h2>Criar conta</h2>

        <p className="descricao">
          Preencha os dados para realizar seu cadastro.
        </p>

        <div className="campo">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

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
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <button type="submit">
          Cadastrar
        </button>

        <p className="texto-alternativo">
          Já tem uma conta?{" "}
          <Link to="/">Entrar</Link>
        </p>

      </form>

    </div>
  );
}
