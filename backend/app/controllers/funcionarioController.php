<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Funcionario;

class FuncionarioController extends Controller
{
    public function indexAction()
    {
        $funcionarios = Funcionario::find();

        $lista = [];

        foreach ($funcionarios as $funcionario) {
            $lista[] = [
                'id' => $funcionario->id,
                'nome' => $funcionario->nome,
                'cpf' => $funcionario->cpf,
                'email' => $funcionario->email,
                'telefone' => $funcionario->telefone,
                'cargo' => $funcionario->cargo
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
            empty($dados->nome) ||
            empty($dados->cpf) ||
            empty($dados->email) ||
            empty($dados->cargo)
        ) {
            echo "Preencha todos os campos obrigatórios!";
            return;
        }

        $funcionario = new Funcionario();

        $funcionario->nome = $dados->nome;
        $funcionario->cpf = $dados->cpf;
        $funcionario->email = $dados->email;
        $funcionario->telefone = $dados->telefone ?? null;
        $funcionario->cargo = $dados->cargo;

        if ($funcionario->save()) {
            echo "Funcionário cadastrado com sucesso!";
        } else {
            echo "Erro ao cadastrar funcionário!";
        }
    }

    public function editarAction($id)
    {
        $funcionario = Funcionario::findFirst($id);

        if ($funcionario) {
            $dados = $this->request->getJsonRawBody();

            if (
                !$dados ||
                empty($dados->nome) ||
                empty($dados->cpf) ||
                empty($dados->email) ||
                empty($dados->cargo)
            ) {
                echo "Preencha todos os campos obrigatórios!";
                return;
            }

            $funcionario->nome = $dados->nome;
            $funcionario->cpf = $dados->cpf;
            $funcionario->email = $dados->email;
            $funcionario->telefone = $dados->telefone ?? null;
            $funcionario->cargo = $dados->cargo;

            if ($funcionario->save()) {
                echo "Funcionário atualizado com sucesso!";
            } else {
                echo "Erro ao atualizar funcionário!";
            }
        } else {
            echo "Funcionário não encontrado!";
        }
    }

    public function excluirAction($id)
    {
        $funcionario = Funcionario::findFirst($id);

        if ($funcionario) {
            if ($funcionario->delete()) {
                echo "Funcionário excluído com sucesso!";
            } else {
                echo "Erro ao excluir funcionário!";
            }
        } else {
            echo "Funcionário não encontrado!";
        }
    }
}
