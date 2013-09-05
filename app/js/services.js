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
    .value('version', '0.1');