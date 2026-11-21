
import { useEffect, useState } from "react";
import ExcluirPlano from "./excluirPlano";

function ListaPlanos({ atualizar, editar }) {

  const [planos, setPlanos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {

    async function buscarPlanos() {
      try {
        const resposta = await fetch("http://localhost:8000/planos");

        if (!resposta.ok) {
          throw new Error("Erro ao buscar planos");
        }

        const dados = await resposta.json();

        setPlanos(dados);

      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os planos.");
      }
    }

    buscarPlanos();

  }, []);

  return (
    <div>
      <h2>Planos cadastrados</h2>

      {erro && <p>{erro}</p>}

      {planos.length === 0 && !erro && (
        <p>Nenhum plano cadastrado.</p>
      )}

      {planos.map((plano) => (

        <div className="caixa-aluno" key={plano.id}>

          <h3>{plano.nome}</h3>

          <p>Valor: R$ {Number(plano.valor).toFixed(2)}</p>

          <p>Duração: {plano.duracao} meses</p>

          <button onClick={() => editar(plano)}>
            Editar
          </button>

          <ExcluirPlano
            plano={plano}
            atualizar={atualizar}
          />

        </div>

      ))}

    </div>
  );
}

export default ListaPlanos;
