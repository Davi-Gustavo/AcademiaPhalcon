<?php

use Phalcon\Mvc\Application;

define('BASE_PATH', dirname(__DIR__));

require BASE_PATH . '/vendor/autoload.php';

$di = require BASE_PATH . '/config/services.php';

$router = require BASE_PATH . '/config/routes.php';

$di->setShared('router', $router);

$application = new Application($di);

$application->useImplicitView(false);

$application->handle(
    $_SERVER['REQUEST_URI']
)->send();