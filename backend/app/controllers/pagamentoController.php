<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Pagamento;

class PagamentoController extends Controller
{
    public function indexAction()
    {
        $pagamentos = Pagamento::find();

        foreach ($pagamentos as $pagamento) {
            echo "Matrícula: " . $pagamento->matricula_id .
                 " - Valor: R$ " . $pagamento->valor .
                 " - Data: " . $pagamento->data_pagamento .
                 " - Vencimento: " . $pagamento->data_vencimento .
                 " - Forma: " . $pagamento->forma_pagamento . "<br>";
        }
    }

    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

        $pagamento = new Pagamento();

        $pagamento->matricula_id = $dados->matricula_id;
        $pagamento->valor = $dados->valor;
        $pagamento->data_pagamento = $dados->data_pagamento;
        $pagamento->data_vencimento = $dados->data_vencimento;
        $pagamento->forma_pagamento = $dados->forma_pagamento;

        if ($pagamento->save()) {
            echo "Pagamento cadastrado com sucesso!";
        } else {
            echo "Erro ao cadastrar pagamento!";
        }
    }

    public function editarAction($id)
    {
        $pagamento = Pagamento::findFirst($id);

        if ($pagamento) {
            $dados = $this->request->getJsonRawBody();

            $pagamento->matricula_id = $dados->matricula_id;
            $pagamento->valor = $dados->valor;
            $pagamento->data_pagamento = $dados->data_pagamento;
            $pagamento->data_vencimento = $dados->data_vencimento;
            $pagamento->forma_pagamento = $dados->forma_pagamento;

            if ($pagamento->save()) {
                echo "Pagamento atualizado com sucesso!";
            } else {
                echo "Erro ao atualizar pagamento!";
            }
        } else {
            echo "Pagamento não encontrado!";
        }
    }

    public function excluirAction($id)
    {
        $pagamento = Pagamento::findFirst($id);

        if ($pagamento) {
            if ($pagamento->delete()) {
                echo "Pagamento excluído com sucesso!";
            } else {
                echo "Erro ao excluir pagamento!";
            }
        } else {
            echo "Pagamento não encontrado!";
        }
    }
}