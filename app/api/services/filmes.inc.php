<?php

 /*\
  *     Todos os filmes.
 \*/

$app->get("/filmes", function () use ($app, $db) {
    $filmes = array();
    foreach ($db->filme() as $filme) {

        $elenco = array();
        foreach ($filme->elenco() as $elencoDB) {
            $elenco[] = array( 
                    'id' => $elencoDB->ator["id"], 
                    'nome' => $elencoDB->ator["nome"] 
            );
        }

        $filmes[] = array(
            'id'        => $filme["id"], 
            'titulo'    => $filme["titulo"], 
            'ano'       => $filme["ano"],
            'genero'    => array(
                            'id'        => $filme->genero["id"],
                            'descricao' => $filme->genero["descricao"]),
            'elenco'    => $elenco
        ); 
    } 
    $app->response()->header("Content-Type", "application/json");            
    echo json_encode($filmes);
});

 /*\
  *     Busca um filme pelo ID.
 \*/

$app->get("/filmes/:id", function ($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json charset=utf-8");
    $filmeDB = $db->filme()->where("id", $id);
    if ($filme = $filmeDB->fetch()) {
        
        $elenco = array();
        foreach ($filme->elenco() as $elencoDB) {
            $elenco[] = array( 
                    'id' => $elencoDB->ator["id"], 
                    'nome' => $elencoDB->ator["nome"] 
            );
        }
        
        echo json_encode (array(
            "id"        => $filme["id"],
            "titulo"    => $filme["titulo"],
            "ano"       => $filme["ano"],
            'genero'    => array(
                            'id'        => $filme->genero["id"],
                            'descricao' => $filme->genero["descricao"]),
            'elenco'    => $elenco
        ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "Filme ID $id inexistente."
            ));
    }
});

 /*\
  *     Insere um novo filme
 \*/
$app->post("/filmes", function () use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    
    $filme = json_decode($app->request()->getBody(),true);    
    $filme['genero_id'] = $filme['genero']['id'];   
                    unset($filme['genero']);                    
    
    $result = $db->filme->insert($filme);
    echo json_encode(array("id" => $result["id"]));
});


 /*\
  *     Altera um filme.
 \*/

$app->put("/filmes/:id", function ($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $filme = $db->filme()->where("id", $id);    
    if ($filme->fetch()) {        
        
        $filmeUp = json_decode($app->request()->getBody(),true);
        $filmeUp['genero_id'] = $filmeUp['genero']['id'];   
                          unset($filmeUp['genero']); 
    
        $result = $filme->update($filmeUp);
        echo json_encode(array(
            "status" => (bool)$result,
            "message" => "filme updated successfully"
            ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "filme id $id does not exist"
        ));
    }
});

 /*\
  *     Apaga um filme.
 \*/

$app->delete("/filmes/:id", function ($id) use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $filme = $db->filme()->where("id", $id);
    if ($filme->fetch()) {
        $result = $filme->delete();
        echo json_encode(array(
            "status" => true,
            "message" => "filme deleted successfully"
        ));
    }
    else{
        echo json_encode(array(
            "status" => false,
            "message" => "filme id $id does not exist"
        ));
    }
});

?>