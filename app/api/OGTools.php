<?php

class OGTools {

    function __construct() {

    }
    
    /*\
    |*| Codifica o Array Recursivamente para UTF8.
    \*/
    private static function utf8_encode_array(&$array) {
        if (is_array($array)) {
            array_walk ($array, 'OGTools::utf8_encode_array');
        } else {
            $array = utf8_encode($array);
        }
    }
    /*\
    |*| Retorna o Array codificado em UTF8 e no formato JSON.
    \*/
    public static function encode ($array) {        
        array_walk ($array, 'OGTools::utf8_encode_array');
        return json_encode($array);
    }

}

?>