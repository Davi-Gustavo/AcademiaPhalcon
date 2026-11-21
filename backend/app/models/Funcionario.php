<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class Funcionario extends Model
{
    public $id;
    public $nome;
    public $cpf;
    public $email;
    public $telefone;
    public $cargo;

    public function initialize()
    {
        $this->setSource('funcionarios');
    }
}
