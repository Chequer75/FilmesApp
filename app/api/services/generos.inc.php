<?php

 /*\
  *     Todos os Generos.
 \*/

$app->get("/generos", function () use ($app, $db) {
    $generos = array();
    foreach ($db->genero() as $genero) {

        $generos[] = array(
            'id'        => $genero["id"], 
            'descricao'    => $genero["descricao"]
        ); 
    } 
    $app->response()->header("Content-Type", "application/json");            
    echo json_encode($generos);
});

 /*\
  *     Busca um genero pelo ID.
 \*/

$app->get("/generos/:id", function ($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json charset=utf-8");
    $generoDB = $db->genero()->where("id", $id);
    if ($genero = $generoDB->fetch()) {
        echo json_encode (array(
            "id"        => $genero["id"],
            "descricao"    => $genero["descricao"]
        ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "Genero ID $id inexistente."
            ));
    }
});

 /*\
  *     Insere um novo genero
 \*/
$app->post("/generos", function () use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    
    $genero = json_decode($app->request()->getBody(),true);                    
    
    $result = $db->genero->insert($genero);
    echo json_encode(array("id" => $result["id"]));
});


 /*\
  *     Altera um filme
 \*/

$app->put("/generos/:id", function ($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $genero = $db->genero()->where("id", $id);    
    if ($genero->fetch()) {        
        
        $generoUp = json_decode($app->request()->getBody(),true);
    
        $result = $genero->update($generoUp);
        echo json_encode(array(
            "status" => (bool)$result,
            "message" => "Genero updated successfully"
            ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "Genero id $id does not exist"
        ));
    }
});

 /*\
  *     Apaga um filme.
 \*/

$app->delete("/generos/:id", function ($id) use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $genero = $db->genero()->where("id", $id);
    if ($genero->fetch()) {
        $result = $genero->delete();
        echo json_encode(array(
            "status" => true,
            "message" => "genero deleted successfully"
        ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "genero id $id does not exist"
        ));
    }
});

?>