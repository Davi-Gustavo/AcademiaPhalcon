<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

        if (
            !$dados ||
            empty($dados->nome) ||
            empty($dados->email) ||
            empty($dados->senha)
        ) {
            echo "Preencha todos os campos!";
            return;
        }

        if (!filter_var($dados->email, FILTER_VALIDATE_EMAIL)) {
            echo "Informe um email válido!";
            return;
        }

        $usuarioExistente = Usuario::findFirst([
            'conditions' => 'email = :email:',
            'bind' => [
                'email' => $dados->email
            ]
        ]);

        if ($usuarioExistente) {
            echo "Este email já está cadastrado!";
            return;
        }

        $usuario = new Usuario();

        $usuario->nome = $dados->nome;
        $usuario->email = $dados->email;
        $usuario->senha = password_hash($dados->senha, PASSWORD_DEFAULT);

        if ($usuario->save()) {
            echo "Usuário cadastrado com sucesso!";
        } else {
            echo "Erro ao cadastrar usuário!";
        }
    }

    public function loginAction()
    {
        $dados = $this->request->getJsonRawBody();

        if (
            !$dados ||
            empty($dados->email) ||
            empty($dados->senha)
        ) {
            echo "Informe o email e a senha!";
            return;
        }

        $usuario = Usuario::findFirst([
            'conditions' => 'email = :email:',
            'bind' => [
                'email' => $dados->email
            ]
        ]);

        if ($usuario && password_verify($dados->senha, $usuario->senha)) {
            echo "Login realizado com sucesso!";
        } else {
            echo "Email ou senha incorretos!";
        }
    }
}
