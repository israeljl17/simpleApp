//var app = angular.module("hashTagWorkApp", ['ui.router', 'ngStorage', 'ngMap', 'ui.mask']);
var app = angular.module("hfTesteApp", ['angularUtils.directives.dirPagination', 'ngRoute', 'ngStorage']);

app.config(function($routeProvider, $locationProvider) {

    /*
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    */

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/produtos', {
            templateUrl: '/view/produtos/consultarTodos.html',
            controller: 'ProdutoCtrl',
            autorize: true
        })
        .when('/produtos/adicionar', {
            templateUrl: '/view/produtos/cadastrar.html',
            controller: 'ProdutoCtrl',
            autorize: true
        })
        .when('/produtos/editar/:id', {
            templateUrl: '/view/produtos/editar.html',
            controller: 'ProdutoCtrl',
            autorize: true
        })
        .when('/produtos/consultar/:id', {
            templateUrl: '/view/produtos/consultar.html',
            controller: 'ProdutoCtrl',
            autorize: true
        })
        .when('/usuarios/cadastrar', {
            templateUrl: '/view/usuarios/cadastrar.html',
            controller: 'UsuarioCtrl'
        })
        .when('/usuarios/login', {
            templateUrl: '/view/usuarios/login.html',
            controller: 'UsuarioCtrl'
        })
        .when('/usuarios/refresh', {
            templateUrl: '/view/usuarios/refresh.html',
            controller: 'UsuarioCtrl'
        })
        .otherwise({
            redirectTo: '/produtos'
        });
});
