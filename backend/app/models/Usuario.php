<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class Usuario extends Model
{
    public function initialize()
    {
        $this->setSource('usuarios');
    }
}