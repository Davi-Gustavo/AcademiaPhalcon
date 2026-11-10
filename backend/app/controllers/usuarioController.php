<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

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