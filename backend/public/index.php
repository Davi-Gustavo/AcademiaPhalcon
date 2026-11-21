
<?php

use Phalcon\Mvc\Application;

define('BASE_PATH', dirname(__DIR__));

// Configuração de CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require BASE_PATH . '/vendor/autoload.php';

spl_autoload_register(function ($classe) {

    $nome = str_replace('App\\Controllers\\', '', $classe);

    $arquivo = BASE_PATH . '/app/controllers/' . lcfirst($nome) . '.php';

    if (file_exists($arquivo)) {
        require $arquivo;
    }
});

$di = require BASE_PATH . '/config/services.php';

$router = require BASE_PATH . '/config/routes.php';

$di->setShared('router', $router);

$application = new Application($di);

$application->useImplicitView(false);

$application->handle(
    $_SERVER['REQUEST_URI']
)->send();
