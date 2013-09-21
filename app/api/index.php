<?php

/*$app = new Slim();

$app->get('/wines', 'getWines');
$app->get('/wines/:id',	'getWine');
$app->get('/wines/search/:query', 'findByName');
$app->post('/wines', 'addWine');
$app->put('/wines/:id', 'updateWine');
$app->delete('/wines/:id', 'deleteWine');

$app->run();
*/

        require_once "NotORM.php";
        require_once 'Slim/Slim.php';
        require_once "OGTools.php";
        
        \Slim\Slim::registerAutoloader();
        
        $app = new \Slim\Slim(array(
            'debug' => true
        ));
        
        //Cookie Criptografado
        $app->add(new \Slim\Middleware\SessionCookie(array(
            'expires' => '20 minutes',
            'path' => '/',
            'domain' => null,
            'secure' => false,
            'httponly' => false,
            'name' => 'filmera_session',
            'secret' => 'xTr3meSecr3tP4s5(@)#7#7#7',
            'cipher' => MCRYPT_RIJNDAEL_256,
            'cipher_mode' => MCRYPT_MODE_CBC
        )));        
        
        //Abaixo as configurações do banco de dados no objeto PDO.
        $pdo = new PDO("mysql:dbname=filmera;host=localhost;charset=utf8","root","");
        
        $db = new NotORM($pdo);
        
        //Include Services
        
        include './services/filmes.inc.php';
        include './services/generos.inc.php';
        include './services/atores.inc.php';
        
        
        //Inicia a API.
        $app->run();


?>