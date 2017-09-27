app.controller('ProdutoCtrl', function($scope, $http, $routeParams, $rootScope, $location) {

    $rootScope.logado = true;
    $rootScope.deslogado = false;

    $scope.consultarTodos = function() {
        $http.get('/api/produtos').then(function(response) {
            $scope.produtos = response.data;
        });
    };

    $scope.consultar = function() {
        var idProduto = $routeParams.id;
        $http.get('/api/produtos/' + idProduto).then(function(response) {
            if (response.data.erroMsg) {
                $location.path('/produtos');
                Materialize.toast(response.data.erroMsg, 4000);
            } else {
                $scope.produto = response.data;
            }
        });
    };

    $scope.adicionar = function() {
        var produto = $scope.produto;
        $http.post('/api/produtos', produto).then(function(response) {
            if (response.data.erroMsg) {
                Materialize.toast(response.data.erroMsg, 4000);
            } else {
                $location.path('/produtos');
                Materialize.toast(response.data.msg, 4000);
            }
        });
    };

    $scope.editar = function() {
        var produto = $scope.produto;
        $http.put('/api/produtos/' + produto._id, produto).then(function(response) {
            if (response.data.erroMsg) {
                Materialize.toast(response.data.erroMsg, 4000);
            } else {
                $location.path('/produtos');
                Materialize.toast(response.data.msg, 4000);
            }
        });
    };

    $scope.deletar = function() {
        var produto = $scope.produto;
        $http.delete('/api/produtos/' + produto._id).then(function(response) {
            if (response.data.erroMsg) {
                Materialize.toast(response.data.erroMsg, 4000);
            } else {
                $location.path('/produtos');
                Materialize.toast(response.data.msg, 4000);
            }
        });
    };

});
