<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Plano;

class PlanoController extends Controller
{
    public function indexAction()
    {
        $planos = Plano::find();

        foreach ($planos as $plano) {
            echo $plano->nome . " - R$ " . $plano->valor . " - " . $plano->duracao . " meses<br>";
        }
    }

    public function cadastrarAction()
    {
        $dados = $this->request->getJsonRawBody();

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

            $plano->nome = $dados->nome;
            $plano->valor = $dados->valor;
            $plano->duracao = $dados->duracao;

            if ($plano->save()) {
                echo "Plano atualizado com sucesso!";
            } 
            else {
                echo "Erro ao atualizar plano!";
            }
        } 
        else {
            echo "Plano não encontrado!";
        }
    }

    public function excluirAction($id)
    {
        $plano = Plano::findFirst($id);

        if ($plano) {

            if ($plano->delete()) {
                echo "Plano excluído com sucesso!";
            } 
            else {
                echo "Erro ao excluir plano!";
            }
        }   
        else{
            echo "Plano não encontrado!";
        }
    }
}

