<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class Matricula extends Model
{
    public function initialize()
    {
        $this->setSource('matriculas');
    }
}