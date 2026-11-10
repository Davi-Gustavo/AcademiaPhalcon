<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class Pagamento extends Model
{
    public function initialize()
    {
        $this->setSource('pagamentos');
    }
}