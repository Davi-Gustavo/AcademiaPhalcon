
import { useState } from "react";

function EditarPagamento({ pagamento, fechar, atualizar }) {
  const [matricula_id, setMatriculaId] = useState(pagamento.matricula_id);
  const [valor, setValor] = useState(pagamento.valor);
  const [data_pagamento, setDataPagamento] = useState(pagamento.data_pagamento);
  const [data_vencimento, setDataVencimento] = useState(pagamento.data_vencimento);
  const [forma_pagamento, setFormaPagamento] = useState(pagamento.forma_pagamento);
  const [erro, setErro] = useState("");

  async function editar(e) {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch(
        `http://localhost:8000/pagamentos/${pagamento.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matricula_id,
            valor,
            data_pagamento,
            data_vencimento,
            forma_pagamento
          })
        }
      );

      const mensagem = await resposta.text();

      if (mensagem.toLowerCase().includes("sucesso")) {
        alert(mensagem);
        atualizar();
        fechar();
      } else {
        setErro(mensagem);
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <form className="formulario" onSubmit={editar}>
      <h2>Editar pagamento</h2>

      <div className="campo">
        <label>ID da matrícula</label>
        <input
          type="number"
          min="1"
          value={matricula_id}
          onChange={(e) => setMatriculaId(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>Valor</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>Data do pagamento</label>
        <input
          type="date"
          value={data_pagamento}
          onChange={(e) => setDataPagamento(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>Data de vencimento</label>
        <input
          type="date"
          value={data_vencimento}
          onChange={(e) => setDataVencimento(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label>Forma de pagamento</label>
        <select
          value={forma_pagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
          required
        >
          <option value="PIX">PIX</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <button type="submit">Salvar alterações</button>
      <button type="button" onClick={fechar}>Voltar</button>
    </form>
  );
}

export default EditarPagamento;
