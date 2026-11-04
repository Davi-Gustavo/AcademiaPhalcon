<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Db\Adapter\Pdo\Mysql;

$di = new FactoryDefault();

$di->setShared('db', function () {
    return new Mysql([
        'host' => '127.0.0.1',
        'username' => 'root',
        'password' => 'root',
        'dbname' => 'academia',
        'port' => 3306,
        'charset' => 'utf8mb4'
    ]);
});

return $di;