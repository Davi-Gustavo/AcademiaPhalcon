<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Pagamento;
use App\Models\Matricula;
use App\Models\Plano;

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

    public function pendentesAction()
    {
        $hoje = date('Y-m-d');

        $pagamentos = Pagamento::find([
            'conditions' => 'data_vencimento < :hoje:',
            'bind' => [
                'hoje' => $hoje
            ]
        ]);

        foreach ($pagamentos as $pagamento) {
            echo "Matrícula: " . $pagamento->matricula_id .
                " - Vencimento: " . $pagamento->data_vencimento .
                " - Situação: Vencida<br>";
        }
    }

    public function mensalidadesPendentesAction()
    {
        $matriculas = Matricula::find();

        $hoje = date('Y-m-d');

        foreach ($matriculas as $matricula) {

            if ($matricula->status != 'ATIVA') {
                continue;
            }

            $plano = Plano::findFirst($matricula->plano_id);

            if ($plano) {

                $limite = $hoje;

                if (!empty($matricula->data_fim) && $matricula->data_fim < $limite) {
                    $limite = $matricula->data_fim;
                }

                $dataVencimento = $matricula->data_inicio;

                while ($dataVencimento <= $limite) {

                    $pagamento = Pagamento::findFirst([
                        'conditions' => 'matricula_id = :matricula: AND data_vencimento = :vencimento:',
                        'bind' => [
                            'matricula' => $matricula->id,
                            'vencimento' => $dataVencimento
                        ]
                    ]);

                    if (!$pagamento) {
                        echo "Matrícula: " . $matricula->id .
                            " - Vencimento: " . $dataVencimento .
                            " - Valor: R$ " . $plano->valor .
                            " - Situação: Pendente<br>";
                    }

                    $dataVencimento = date(
                        'Y-m-d',
                        strtotime($dataVencimento . ' +1 month')
                    );
                }
            }
        }
    }
}
