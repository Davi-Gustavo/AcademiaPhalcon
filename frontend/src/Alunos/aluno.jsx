
import { useEffect, useState } from "react";

function Alunos() {

  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {

    async function buscarAlunos() {

      try {
        const resposta = await fetch("http://localhost:8000/alunos");

        const dados = await resposta.text();

        const lista = dados
          .split("<br>")
          .filter(item => item.trim() !== "");

        setAlunos(lista);

      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar alunos!");
      }

    }

    buscarAlunos();

  }, []);

  return (

    <div>

      <h1>Alunos</h1>

      <p>Gerenciamento de alunos cadastrados.</p>

      {erro && <p>{erro}</p>}

      {alunos.length === 0 && !erro && (
        <p>Nenhum aluno cadastrado.</p>
      )}

      {alunos.map((aluno, index) => (

        <div key={index}>
          <p>{aluno}</p>
        </div>

      ))}

    </div>

  );

}

export default Alunos;
