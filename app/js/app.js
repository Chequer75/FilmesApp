'use strict';


// Declare app level module which depends on filters, and services
angular.module('filmera', ['filmera.filters', 'filmera.services', 'filmera.directives', 'filmera.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
            .when('/filmes',            {templateUrl: 'partials/filmes/list.html', controller: 'FilmesListController'})
            .when('/filmes/view/:id',   {templateUrl: 'partials/filmes/view.html', controller: 'FilmesViewController'})
            .when('/filmes/new/',       {templateUrl: 'partials/filmes/form.html', controller: 'FilmesNewController'})
            .when('/filmes/edit/:id',   {templateUrl: 'partials/filmes/form.html', controller: 'FilmesEditController'})
            .when('/generos',            {templateUrl: 'partials/generos/list.html', controller: 'GenerosListController'})
            .when('/generos/view/:id',   {templateUrl: 'partials/generos/view.html', controller: 'GenerosViewController'})
            .when('/generos/new/',       {templateUrl: 'partials/generos/form.html', controller: 'GenerosNewController'})
            .when('/generos/edit/:id',   {templateUrl: 'partials/generos/form.html', controller: 'GenerosEditController'})
            .when('/atores',            {templateUrl: 'partials/atores/list.html', controller: 'AtoresListController'})
            .when('/atores/view/:id',   {templateUrl: 'partials/atores/view.html', controller: 'AtoresViewController'})
            .when('/atores/new/',       {templateUrl: 'partials/atores/form.html', controller: 'AtoresNewController'})
            .when('/atores/edit/:id',   {templateUrl: 'partials/atores/form.html', controller: 'AtoresEditController'})
            .otherwise({redirectTo: '/filmes'});
  }]);
