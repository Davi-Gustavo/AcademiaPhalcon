<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Matricula;
use App\Models\Aluno;
use App\Models\Plano;
use App\Models\Pagamento;

class MatriculaController extends Controller
{
    public function indexAction()
    {
        $matriculas = Matricula::find();

        $lista = [];

        foreach ($matriculas as $matricula) {
            $lista[] = [
                'id' => $matricula->id,
                'aluno_id' => $matricula->aluno_id,
                'plano_id' => $matricula->plano_id,
                'data_inicio' => $matricula->data_inicio,
                'data_fim' => $matricula->data_fim,
                'status' => $matricula->status
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
            empty($dados->aluno_id) ||
            empty($dados->plano_id) ||
            empty($dados->data_inicio)
        ) {
            echo "Preencha todos os campos obrigatórios!";
            return;
        }

        $aluno = Aluno::findFirst($dados->aluno_id);
        $plano = Plano::findFirst($dados->plano_id);

        if (!$aluno) {
            echo "Aluno não encontrado!";
            return;
        }

        if (!$plano) {
            echo "Plano não encontrado!";
            return;
        }

        if (
            !empty($dados->data_fim) &&
            $dados->data_fim < $dados->data_inicio
        ) {
            echo "A data final não pode ser anterior à data inicial!";
            return;
        }

        $matricula = new Matricula();

        $matricula->aluno_id = $dados->aluno_id;
        $matricula->plano_id = $dados->plano_id;
        $matricula->data_inicio = $dados->data_inicio;
        $matricula->data_fim = $dados->data_fim ?? null;
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

            if (
                !$dados ||
                empty($dados->aluno_id) ||
                empty($dados->plano_id) ||
                empty($dados->data_inicio)
            ) {
                echo "Preencha todos os campos obrigatórios!";
                return;
            }

            $aluno = Aluno::findFirst($dados->aluno_id);
            $plano = Plano::findFirst($dados->plano_id);

            if (!$aluno) {
                echo "Aluno não encontrado!";
                return;
            }

            if (!$plano) {
                echo "Plano não encontrado!";
                return;
            }

            if (
                !empty($dados->data_fim) &&
                $dados->data_fim < $dados->data_inicio
            ) {
                echo "A data final não pode ser anterior à data inicial!";
                return;
            }

            $matricula->aluno_id = $dados->aluno_id;
            $matricula->plano_id = $dados->plano_id;
            $matricula->data_inicio = $dados->data_inicio;
            $matricula->data_fim = $dados->data_fim ?? null;

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

        if (!$matricula) {
            echo "Matrícula não encontrada!";
            return;
        }

        $pagamentos = Pagamento::find([
            "conditions" => "matricula_id = :matricula_id:",
            "bind" => [
                "matricula_id" => $id
            ]
        ]);

        $transacao = $this->db->begin();

        foreach ($pagamentos as $pagamento) {
            if (!$pagamento->delete()) {
                $this->db->rollback();
                echo "Erro ao excluir os pagamentos da matrícula!";
                return;
            }
        }

        if (!$matricula->delete()) {
            $this->db->rollback();
            echo "Erro ao excluir matrícula!";
            return;
        }

        $this->db->commit();

        echo "Matrícula excluída com sucesso!";
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