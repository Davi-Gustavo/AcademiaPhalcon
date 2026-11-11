<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Matricula;

class MatriculaController extends Controller
{
    public function indexAction()
    {
        $matriculas = Matricula::find();

        foreach ($matriculas as $matricula) {
            echo "Aluno: " . $matricula->aluno_id .
                 " - Plano: " . $matricula->plano_id .
                 " - Início: " . $matricula->data_inicio .
                 " - Fim: " . $matricula->data_fim .
                 " - Status: " . $matricula->status . "<br>";
        }
    }

    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

        $matricula = new Matricula();

        $matricula->aluno_id = $dados->aluno_id;
        $matricula->plano_id = $dados->plano_id;
        $matricula->data_inicio = $dados->data_inicio;
        $matricula->data_fim = $dados->data_fim;
        $matricula->status = 'ATIVA';

        if ($matricula->save()) {
            echo "Matrícula cadastrada com sucesso!";
        } else {
            echo "Erro ao cadastrar matrícula!";
        }
    }

    public function editarAction($id)
    {
        $matricula = Matricula::findFirst($id);

        if ($matricula) {
            $dados = $this->request->getJsonRawBody();

            $matricula->aluno_id = $dados->aluno_id;
            $matricula->plano_id = $dados->plano_id;
            $matricula->data_inicio = $dados->data_inicio;
            $matricula->data_fim = $dados->data_fim;

            if ($matricula->save()) {
                echo "Matrícula atualizada com sucesso!";
            } else {
                echo "Erro ao atualizar matrícula!";
            }
        } else {
            echo "Matrícula não encontrada!";
        }
    }

    public function excluirAction($id)
    {
        $matricula = Matricula::findFirst($id);

        if ($matricula) {
            if ($matricula->delete()) {
                echo "Matrícula excluída com sucesso!";
            } else {
                echo "Erro ao excluir matrícula!";
            }
        } else {
            echo "Matrícula não encontrada!";
        }
    }

    public function cancelarAction($id)
    {
        $matricula = Matricula::findFirst($id);

        if ($matricula) {

            $matricula->status = 'CANCELADA';

            if ($matricula->save()) {
                echo "Matrícula cancelada com sucesso!";
            } else {
                echo "Erro ao cancelar matrícula!";
            }

        } else {
            echo "Matrícula não encontrada!";
        }
    }
}
