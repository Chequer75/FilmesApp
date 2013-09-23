'use strict';

/* Services */

angular.module('filmera.services', ['ngResource'])
    .factory('FilmesAPI', function($resource){

        return $resource('api/filmes/:id', 
        {   //params
            id: "@id"
        },
        {   //additional methods
            update: {
                method: "PUT"
            }            
        });
    })
    .factory('GenerosAPI', function($resource){

        return $resource('api/generos/:id', 
        {   //params
            id: "@id"
        },
        {   //additional methods
            update: {
                method: "PUT"
            }            
        });
    })
    .factory('AtoresAPI', function($resource){

        return $resource('api/atores/:id', 
        {   //params
            id: "@id"
        },
        {   //additional methods
            update: {
                method: "PUT"
            }
        });
    })
    .value('version', '0.1');
