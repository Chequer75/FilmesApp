'use strict';

/* Controllers */

angular.module('filmera.controllers', [])

/* FILMES CONTROLLERS ********************************************************/

.controller('FilmesListController', ['$scope', 'FilmesAPI','$location','$rootScope', function($scope, FilmesAPI, $location, $rootScope) {
    $rootScope.appTitle = 'Filmes App';
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
  .controller('FilmesNewController', ['$scope', 'FilmesAPI', 'GenerosAPI','$routeParams','$location', function($scope, FilmesAPI, GenerosAPI, $routeParams, $location) {
            
            $scope.filme = {};
            $scope.title = 'Novo';
            $scope.generos = {};
            
            GenerosAPI.query(function(response) {
                $scope.generos = response;
            }, function(response) {
                console.log(response); //refatorar erros
                $scope.status = 'Não pode carregar genero';
            });
            $scope.mouseEnter = function(event){  
                $(event.target).addClass('active').find('span.glyphicon').stop(true,true).fadeIn('fast');
            }
            $scope.mouseLeave = function(event){
                $(event.target).removeClass('active').find('span.glyphicon').stop(true,true).fadeOut('fast');
            }
            $scope.selecionaGenero = function(genero){
                $scope.filme.genero = genero;
            }
            
            var JmodalGeneros = $('#modalGeneros');            
            $scope.modalGeneros = function() {
                JmodalGeneros.modal('show');
            };
            
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
            
  }])
    .controller('FilmesEditController', ['$scope', 'FilmesAPI', 'GenerosAPI', 'AtoresAPI', '$routeParams','$location', function($scope, FilmesAPI, GenerosAPI, AtoresAPI, $routeParams, $location) {
            
        var FilmeId = $routeParams.id,
            todosAtores = {};
            $scope.filme = FilmesAPI.get({id:FilmeId});
            $scope.title = 'Atualizar';
            $scope.generos = {};
            $scope.atores = {};
            
            function atualizaAtores(){
                function temNoFilme(el){
                    return (el.id === this.id);
                }
                function atoresForaFilme(el){
                    return !$scope.filme.elenco.some(temNoFilme, el);
                }                
                $scope.atores = todosAtores.filter(atoresForaFilme);                
            }
            
            AtoresAPI.query(function(response) {
                todosAtores = response;
                if(!$scope.filme.elenco){
                    setTimeout(function (){atualizaAtores();},1000);
                }else{
                    atualizaAtores();                    
                }
                
            }, function(response) {
                console.log(response);
                $scope.status = 'Não pode carregar ator';
            });
            
            GenerosAPI.query(function(response) {
                $scope.generos = response;
            }, function(response) {
                console.log(response); //refatorar erros
                $scope.status = 'Não pode carregar genero';
            });
            
            $scope.removeAtor = function(ator){                
                if(confirm('Tem Certeza?')){
                    var index = $scope.filme.elenco.indexOf(ator);
                    $scope.filme.elenco.splice(index,1);
                    setTimeout(function (){atualizaAtores();},500);
                }
            };
            
            $scope.selecionaAtor = function(ator){
                if($scope.filme.elenco){
                    //$scope.filme.elenco.push({id: ator.id, nome: ator.nome});
                    $scope.filme.elenco.push(ator);
                    
                    console.log($scope.filme.elenco);
                    //atualizaAtores();
                    setTimeout(function (){atualizaAtores();},500);
                }
            };
            var JmodalAtores = $('#modalAtores');            
            $scope.modalAtores = function() {
                JmodalAtores.modal('show');
            };
            
            
            $scope.modalMouseEnter = function(event){  
                $(event.target).find('span.glyphicon').stop(true,true).fadeIn('fast');
                //$(event.target).addClass('active');
            };
            $scope.modalMouseLeave = function(event){
                $(event.target).find('span.glyphicon').stop(true,true).fadeOut('fast');
                //$(event.target).removeClass('active');
            };
            
            
            $scope.selecionaGenero = function(genero){
                $scope.filme.genero = genero;
            };
            
            var JmodalGeneros = $('#modalGeneros');            
            $scope.modalGeneros = function() {
                JmodalGeneros.modal('show');
            };
            
            $scope.saveUpdate = function(){             
                FilmesAPI.update($scope.filme,function(){                        
                        $location.path('filmes/view/'+FilmeId);
                    },function(response){
                        console.log(response);
                    }
                );
            };
            $scope.voltar = function() { //refatorar 
                window.history.back();
            };
            
  }])

/* GENEROS CONTROLLERS ********************************************************/

.controller('GenerosListController', ['$scope', 'GenerosAPI','$location','$rootScope', function($scope, GenerosAPI, $location, $rootScope) {
    $rootScope.appTitle = 'Generos | Filmes App';
    $scope.status;
    $scope.generos = {};

    GenerosAPI.query(function(response) {
        $scope.generos = response;
    }, function(response) {
        console.log(response);
        $scope.status = 'Não pode carregar genero';
    });
    
    $scope.novo = function(){
        $location.path('generos/new/');
    };
    $scope.detalhes = function(id){
        $location.path('generos/view/'+id);
    };
    $scope.editar = function(id){
        $location.path('generos/edit/'+id);
    };

    
  }])
  .controller('GenerosViewController', ['$scope', 'GenerosAPI','$routeParams','$location', function($scope, GenerosAPI, $routeParams, $location) {

            var GeneroId = $routeParams.id;
            $scope.genero = GenerosAPI.get({id:GeneroId});   

            $scope.apagar = function(id) {
                if(confirm('Tem certeza ?')){                    
                    GenerosAPI.remove({
                                        id: $scope.genero.id
                                    });
                    $location.replace().path('generos');
                }
            };
            $scope.detalhes = function(id) {
                $location.path('generos/view/' + id);
            };
            $scope.editar = function(id) {
                $location.path('generos/edit/' + id);
            };
  }])
  .controller('GenerosNewController', ['$scope', 'GenerosAPI', '$location', function($scope, GenerosAPI, $location) {
            
            $scope.genero = {};
            $scope.title = 'Novo';
            
            $scope.saveUpdate = function(){                
                GenerosAPI.save($scope.genero,function(response){
                        console.log(response.id);
                        $location.path('generos/view/'+response.id);
                    },function(response){
                        console.log(response);
                    }
                );
                console.log($scope.genero);
            };
            $scope.voltar = function() { //refatorar root
                window.history.back();
            };
            
  }])
    .controller('GenerosEditController', ['$scope', 'GenerosAPI','$routeParams','$location', function($scope, GenerosAPI, $routeParams, $location) {
            var GeneroId = $routeParams.id;
            $scope.genero = GenerosAPI.get({id:GeneroId});
            $scope.title = 'Atualizar';
            
            $scope.saveUpdate = function(){             
                GenerosAPI.update($scope.genero,function(){                        
                        $location.path('generos/view/'+GeneroId);
                    },function(response){
                        console.log(response);
                    }
                );
            };
            $scope.voltar = function() { //refatorar 
                window.history.back();
            };
  }])
  
/* ATORES CONTROLLERS ********************************************************/

.controller('AtoresListController', ['$scope', 'AtoresAPI','$location','$rootScope', function($scope, AtoresAPI, $location, $rootScope) {
    $rootScope.appTitle = 'Atores | Filmes App';
    $scope.status;
    $scope.atores = {};

    AtoresAPI.query(function(response) {
        $scope.atores = response;
    }, function(response) {
        console.log(response);
        $scope.status = 'Não pode carregar ator';
    });
    
    $scope.novo = function(){
        $location.path('atores/new/');
    };
    $scope.detalhes = function(id){
        $location.path('atores/view/'+id);
    };
    $scope.editar = function(id){
        $location.path('atores/edit/'+id);
    };

    
  }])
  .controller('AtoresViewController', ['$scope', 'AtoresAPI','$routeParams','$location', function($scope, AtoresAPI, $routeParams, $location) {

            var AtorId = $routeParams.id;
            $scope.ator = AtoresAPI.get({id:AtorId});   

            $scope.apagar = function(id) {
                if(confirm('Tem certeza ?')){                    
                    AtoresAPI.remove({
                                        id: $scope.ator.id
                                    });
                    $location.replace().path('atores');
                }
            };
            $scope.detalhes = function(id) {
                $location.path('atores/view/' + id);
            };
            $scope.editar = function(id) {
                $location.path('atores/edit/' + id);
            };
  }])
  .controller('AtoresNewController', ['$scope', 'AtoresAPI', '$location', function($scope, AtoresAPI, $location) {
            
            $scope.ator = {};
            $scope.title = 'Novo';
            
            $scope.saveUpdate = function(){                
                AtoresAPI.save($scope.ator,function(response){
                        console.log(response.id);
                        $location.path('atores/view/'+response.id);
                    },function(response){
                        console.log(response);
                    }
                );
                console.log($scope.ator);
            };
            $scope.voltar = function() { //refatorar root
                window.history.back();
            };
            
  }])
    .controller('AtoresEditController', ['$scope', 'AtoresAPI','$routeParams','$location', function($scope, AtoresAPI, $routeParams, $location) {
            var AtorId = $routeParams.id;
            $scope.ator = AtoresAPI.get({id:AtorId});
            $scope.title = 'Atualizar';
            
            $scope.saveUpdate = function(){             
                AtoresAPI.update($scope.ator,function(){                        
                        $location.path('atores/view/'+AtorId);
                    },function(response){
                        console.log(response);
                    }
                );
            };
            $scope.voltar = function() { //refatorar 
                window.history.back();
            };
  }])
  ;