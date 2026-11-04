<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$router->addGet('/', [
    'namespace' => 'App\Controllers',
    'controller' => 'index',
    'action' => 'index'
]);

$router->addGet('/alunos', [
    'namespace' => 'App\Controllers',
    'controller' => 'aluno',
    'action' => 'index'
]);

$router->addPost('/alunos', [
    'namespace' => 'App\Controllers',
    'controller' => 'aluno',
    'action' => 'cadastrar'
]);

return $router;