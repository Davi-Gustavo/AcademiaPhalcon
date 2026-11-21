<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Plano;
use App\Models\Matricula;

class PlanoController extends Controller
{
    public function indexAction()
    {
        $planos = Plano::find();

        $lista = [];

        foreach ($planos as $plano) {
            $lista[] = [
                'id' => $plano->id,
                'nome' => $plano->nome,
                'valor' => $plano->valor,
                'duracao' => $plano->duracao
            ];
        }

        return $this->response
            ->setContentType('application/json', 'UTF-8')
            ->setJsonContent($lista);
    }

    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

        if (!$dados || empty($dados->nome) || !isset($dados->valor) || !isset($dados->duracao)) {
            echo "Preencha todos os campos!";
            return;
        }

        if (!is_numeric($dados->valor) || $dados->valor < 0) {
            echo "O valor do plano não pode ser negativo!";
            return;
        }

        if (!is_numeric($dados->duracao) || $dados->duracao <= 0) {
            echo "A duração deve ser maior que zero!";
            return;
        }

        $plano = new Plano();

        $plano->nome = $dados->nome;
        $plano->valor = $dados->valor;
        $plano->duracao = $dados->duracao;

        if ($plano->save()) {
            echo "Plano cadastrado com sucesso!";
        } else {
            echo "Erro ao cadastrar plano!";
        }
    }

    public function editarAction($id)
    {
        $plano = Plano::findFirst($id);

        if ($plano) {
            $dados = $this->request->getJsonRawBody();

            if (!$dados || empty($dados->nome) || !isset($dados->valor) || !isset($dados->duracao)) {
                echo "Preencha todos os campos!";
                return;
            }

            if (!is_numeric($dados->valor) || $dados->valor < 0) {
                echo "O valor do plano não pode ser negativo!";
                return;
            }

            if (!is_numeric($dados->duracao) || $dados->duracao <= 0) {
                echo "A duração deve ser maior que zero!";
                return;
            }

            $plano->nome = $dados->nome;
            $plano->valor = $dados->valor;
            $plano->duracao = $dados->duracao;

            if ($plano->save()) {
                echo "Plano atualizado com sucesso!";
            } else {
                echo "Erro ao atualizar plano!";
            }
        } else {
            echo "Plano não encontrado!";
        }
    }

    public function excluirAction($id)
{
    $plano = Plano::findFirst($id);

    if (!$plano) {
        echo "Plano não encontrado!";
        return;
    }

    $matricula = Matricula::findFirst([
        'plano_id = :plano_id:',
        'bind' => [
            'plano_id' => $id
        ]
    ]);

    if ($matricula) {
        echo "Não é possível excluir este plano, pois existem matrículas vinculadas a ele!";
        return;
    }

    if ($plano->delete()) {
        echo "Plano excluído com sucesso!";
    } else {
        echo "Erro ao excluir plano!";
    }
}
}
