<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Aluno;

class AlunoController extends Controller
{
    public function indexAction()
    {
        $alunos = Aluno::find();

        $lista = [];

        foreach ($alunos as $aluno) {
            $lista[] = [
                'id' => $aluno->id,
                'nome' => $aluno->nome,
                'cpf' => $aluno->cpf,
                'email' => $aluno->email,
                'telefone' => $aluno->telefone
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
            empty($dados->nome) ||
            empty($dados->cpf) ||
            empty($dados->email) ||
            empty($dados->telefone)
        ) {
            echo "Preencha todos os campos!";
            return;
        }

        $cpfExistente = Aluno::findFirst([
            'conditions' => 'cpf = :cpf:',
            'bind' => [
                'cpf' => $dados->cpf
            ]
        ]);

        if ($cpfExistente) {
            echo "Já existe um aluno cadastrado com esse CPF!";
            return;
        }

        $aluno = new Aluno();

        $aluno->nome = $dados->nome;
        $aluno->cpf = $dados->cpf;
        $aluno->email = $dados->email;
        $aluno->telefone = $dados->telefone;

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

            if (
                empty($dados->nome) ||
                empty($dados->cpf) ||
                empty($dados->email) ||
                empty($dados->telefone)
            ) {
                echo "Preencha todos os campos!";
                return;
            }

            $cpfExistente = Aluno::findFirst([
                'conditions' => 'cpf = :cpf: AND id != :id:',
                'bind' => [
                    'cpf' => $dados->cpf,
                    'id' => $id
                ]
            ]);

            if ($cpfExistente) {
                echo "Esse CPF já pertence a outro aluno!";
                return;
            }

            $aluno->nome = $dados->nome;
            $aluno->cpf = $dados->cpf;
            $aluno->email = $dados->email;
            $aluno->telefone = $dados->telefone;

            if ($aluno->save()) {
                echo "Aluno atualizado com sucesso!";
            } else {
                echo "Erro ao atualizar aluno!";
            }
        } else {
            echo "Aluno não encontrado!";
        }
    }

    public function excluirAction($id)
    {
        $aluno = Aluno::findFirst($id);

        if ($aluno) {
            if ($aluno->delete()) {
                echo "Aluno excluído com sucesso!";
            } else {
                echo "Erro ao excluir aluno!";
            }
        } else {
            echo "Aluno não encontrado!";
        }
    }
}
