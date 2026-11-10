<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

#CRUD DE ALUNOS COMPLETO
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

$router->addPut('/alunos/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'aluno',
    'action' => 'editar'
]);

$router->addDelete('/alunos/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'aluno',
    'action' => 'excluir'
]);

#CRUD DE PLANOS

$router->addGet('/planos', [
    'namespace' => 'App\Controllers',
    'controller' => 'plano',
    'action' => 'index'
]);

$router->addPost('/planos', [
    'namespace' => 'App\Controllers',
    'controller' => 'plano',
    'action' => 'cadastrar'
]);

$router->addPut('/planos/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'plano',
    'action' => 'editar'
]);

$router->addDelete('/planos/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'plano',
    'action' => 'excluir'
]);

#CRUD DE MATRICULAS

$router->addGet('/matriculas', [
    'namespace' => 'App\Controllers',
    'controller' => 'matricula',
    'action' => 'index'
]);

$router->addPost('/matriculas', [
    'namespace' => 'App\Controllers',
    'controller' => 'matricula',
    'action' => 'cadastrar'
]);

$router->addPut('/matriculas/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'matricula',
    'action' => 'editar'
]);

$router->addDelete('/matriculas/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'matricula',
    'action' => 'excluir'
]);

#CRUD DE PAGAMENTOS

$router->addGet('/pagamentos', [
    'namespace' => 'App\Controllers',
    'controller' => 'pagamento',
    'action' => 'index'
]);

$router->addPost('/pagamentos', [
    'namespace' => 'App\Controllers',
    'controller' => 'pagamento',
    'action' => 'cadastrar'
]);

$router->addPut('/pagamentos/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'pagamento',
    'action' => 'editar'
]);

$router->addDelete('/pagamentos/{id}', [
    'namespace' => 'App\Controllers',
    'controller' => 'pagamento',
    'action' => 'excluir'
]);

#ROTAS DE USUARIOS

$router->addPost('/usuarios/cadastrar', [
    'namespace' => 'App\Controllers',
    'controller' => 'usuario',
    'action' => 'cadastrar'
]);

$router->addPost('/usuarios/login', [
    'namespace' => 'App\Controllers',
    'controller' => 'usuario',
    'action' => 'login'
]);

return $router;