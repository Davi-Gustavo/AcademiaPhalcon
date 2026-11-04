<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class Aluno extends Model
{
    public function initialize()
    {
        $this->setSource('alunos');
    }
}