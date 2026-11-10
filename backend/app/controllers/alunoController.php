<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Aluno;

class AlunoController extends Controller
{
    public function indexAction()
    {
        $alunos = Aluno::find();

        foreach ($alunos as $aluno) {
            echo $aluno->nome . "<br>";
        }
    }

    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

        $aluno = new Aluno();

        $aluno-> nome = $dados->nome;
        $aluno-> cpf = $dados->cpf;
        $aluno-> email = $dados->email;
        $aluno-> telefone = $dados->telefone;

        if ($aluno->save()) {
            echo "Aluno cadastrado com sucesso!";
        } else {
            echo "Erro ao cadastrar aluno!";
        }
    }

    public function editarAction($id)
    {
        $aluno = Aluno::findFirst($id);

        if ($aluno) {
            $dados = $this->request->getJsonRawBody();

            $aluno-> nome = $dados->nome;
            $aluno-> cpf = $dados->cpf;
            $aluno-> email = $dados->email;
            $aluno-> telefone = $dados->telefone;

            if ($aluno->save()) {
                echo "Aluno atualizado com sucesso!";
        }   else {
                echo "Erro ao atualizar aluno!";
        }
    }   else {
            echo "Aluno não encontrado!";
        }
    }
    public function excluirAction($id)
    {
        $aluno = Aluno::findFirst($id);

        if ($aluno) {
            if ($aluno->delete()) {
                echo "Aluno excluído com sucesso!";
        }   else {
                echo "Erro ao excluir aluno!";
            }
        }   else {
                echo "Aluno não encontrado!";
            }
    }
}