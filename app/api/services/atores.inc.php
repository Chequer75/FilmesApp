<?php

 /*\
  *     Todos os Atores.
 \*/

$app->get("/atores", function () use ($app, $db) {
    $atores = array();
    foreach ($db->ator() as $ator) {

        $atores[] = array(
            'id'        => $ator["id"], 
            'nome'    => $ator["nome"]
        ); 
    } 
    $app->response()->header("Content-Type", "application/json");            
    echo json_encode($atores);
});

 /*\
  *     Busca um ator pelo ID.
 \*/

$app->get("/atores/:id", function ($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json charset=utf-8");
    $atorDB = $db->ator()->where("id", $id);
    if ($ator = $atorDB->fetch()) {
        echo json_encode (array(
            "id"        => $ator["id"],
            "nome"    => $ator["nome"]
        ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "Ator ID $id inexistente."
            ));
    }
});

 /*\
  *     Insere um novo ator
 \*/
$app->post("/atores", function () use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    
    $ator = json_decode($app->request()->getBody(),true);                    
    
    $result = $db->ator->insert($ator);
    echo json_encode(array("id" => $result["id"]));
});


 /*\
  *     Altera um ator.
 \*/

$app->put("/atores/:id", function ($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $ator = $db->ator()->where("id", $id);    
    if ($ator->fetch()) {        
        
        $atorUp = json_decode($app->request()->getBody(),true);
    
        $result = $ator->update($atorUp);
        echo json_encode(array(
            "status" => (bool)$result,
            "message" => "Ator updated successfully"
            ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "Ator id $id does not exist"
        ));
    }
});

 /*\
  *     Apaga um ator.
 \*/

$app->delete("/atores/:id", function ($id) use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $ator = $db->ator()->where("id", $id);
    if ($ator->fetch()) {
        $result = $ator->delete();
        echo json_encode(array(
            "status" => true,
            "message" => "ator deleted successfully"
        ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "ator id $id does not exist"
        ));
    }
});

?>