'use strict';

/* Controllers */

angular.module('filmera.controllers', []).
  controller('FilmesListController', ['$scope', 'FilmesAPI','$location', function($scope, FilmesAPI, $location) {
    
    $scope.status;
    $scope.filmes = {};

    FilmesAPI.query(function(response) {
        $scope.filmes = response;
    }, function(response) {
        console.log(response);
        $scope.status = 'Não pode carregar filme';
    });
    
    $scope.novo = function(){
        $location.path('filmes/new/');
    };
    $scope.detalhes = function(id){
        $location.path('filmes/view/'+id);
    };
    $scope.editar = function(id){
        $location.path('filmes/edit/'+id);
    };

    
  }])
  .controller('FilmesViewController', ['$scope', 'FilmesAPI','$routeParams','$location', function($scope, FilmesAPI, $routeParams, $location) {
            $scope.status = $routeParams.id; 
            var FilmeId = $routeParams.id;
            $scope.filme = FilmesAPI.get({id:FilmeId});   

            $scope.apagar = function(id) {
                if(confirm('Tem certeza ?')){                    
                    FilmesAPI.remove({
                                        id: $scope.filme.id
                                    });
                    $location.replace().path('filmes');
                }
            };
            $scope.detalhes = function(id) {
                $location.path('filmes/view/' + id);
            };
            $scope.editar = function(id) {
                $location.path('filmes/edit/' + id);
            };
  }])
  .controller('FilmesNewController', ['$scope', 'FilmesAPI','$routeParams','$location', function($scope, FilmesAPI, $routeParams, $location) {
            
            $scope.filme = {};
            $scope.title = 'Novo';
            
            $scope.saveUpdate = function(){                
                FilmesAPI.save($scope.filme,function(response){
                        console.log(response.id);
                        $location.path('filmes/view/'+response.id);
                    },function(response){
                        console.log(response);
                    }
                );
                console.log($scope.filme);
            };
            $scope.voltar = function() {
                window.history.back();
            };
            
  }]).controller('FilmesEditController', ['$scope', 'FilmesAPI','$routeParams','$location', function($scope, FilmesAPI, $routeParams, $location) {
            var FilmeId = $routeParams.id;
            $scope.filme = FilmesAPI.get({id:FilmeId});
            $scope.title = 'Atualizar';
            
            $scope.saveUpdate = function(){             
                FilmesAPI.update($scope.filme,function(){                        
                        $location.path('filmes/view/'+FilmeId);
                    },function(response){
                        console.log(response);
                    }
                );
            };
            $scope.voltar = function() {
                window.history.back();
            };
  }]);