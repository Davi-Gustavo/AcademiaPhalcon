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

        $lista = [];

        foreach ($pagamentos as $pagamento) {
            $lista[] = [
                'id' => $pagamento->id,
                'matricula_id' => $pagamento->matricula_id,
                'valor' => $pagamento->valor,
                'data_pagamento' => $pagamento->data_pagamento,
                'data_vencimento' => $pagamento->data_vencimento,
                'forma_pagamento' => $pagamento->forma_pagamento
            ];
        }

        return $this->response
            ->setContentType('application/json', 'UTF-8')
            ->setJsonContent($lista);
    }

    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

        if (
            !$dados ||
            empty($dados->matricula_id) ||
            !isset($dados->valor) ||
            empty($dados->data_pagamento) ||
            empty($dados->data_vencimento) ||
            empty($dados->forma_pagamento)
        ) {
            echo "Preencha todos os campos!";
            return;
        }

        if (!is_numeric($dados->valor) || $dados->valor <= 0) {
            echo "O valor deve ser maior que zero!";
            return;
        }

        $matricula = Matricula::findFirst($dados->matricula_id);

        if (!$matricula) {
            echo "Matrícula não encontrada!";
            return;
        }

        if ($matricula->status != 'ATIVA') {
            echo "Não é possível cadastrar pagamento para uma matrícula cancelada!";
            return;
        }

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

            if (
                !$dados ||
                empty($dados->matricula_id) ||
                !isset($dados->valor) ||
                empty($dados->data_pagamento) ||
                empty($dados->data_vencimento) ||
                empty($dados->forma_pagamento)
            ) {
                echo "Preencha todos os campos!";
                return;
            }

            if (!is_numeric($dados->valor) || $dados->valor <= 0) {
                echo "O valor deve ser maior que zero!";
                return;
            }

            $matricula = Matricula::findFirst($dados->matricula_id);

            if (!$matricula) {
                echo "Matrícula não encontrada!";
                return;
            }

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
        $this->mensalidadesPendentesAction();
    }

    public function mensalidadesPendentesAction()
    {
        $matriculas = Matricula::find([
            "conditions" => "status = 'ATIVA'"
        ]);

        foreach ($matriculas as $matricula) {
            $plano = Plano::findFirst($matricula->plano_id);

            if (!$plano) {
                continue;
            }

            $quantidadePagamentos = Pagamento::count([
                "conditions" => "matricula_id = :matricula_id:",
                "bind" => [
                    "matricula_id" => $matricula->id
                ]
            ]);
            $mensalidadeAtual = 0;

            $dataInicio = new \DateTime($matricula->data_inicio);
            $hoje = new \DateTime();

            $dataFim = !empty($matricula->data_fim)
                ? new \DateTime($matricula->data_fim)
                : $hoje;

            while ($dataInicio <= $hoje && $dataInicio <= $dataFim) {

                $vencimento = $dataInicio->format('Y-m-d');

                if ($mensalidadeAtual >= $quantidadePagamentos) {

                    $situacao = $vencimento < $hoje->format('Y-m-d')
                        ? 'Vencida'
                        : 'Pendente';

                    echo "Matrícula: " . $matricula->id .
                        " - Vencimento: " . $vencimento .
                        " - Valor: R$ " . $plano->valor .
                        " - Situação: " . $situacao . "<br>";
                }

                $mensalidadeAtual++;

                $dataInicio->modify('+1 month');
            }
        }
    }
}