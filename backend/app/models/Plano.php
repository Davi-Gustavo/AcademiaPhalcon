<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class Plano extends Model
{
    public function initialize()
    {
        $this->setSource('planos');
    }
}