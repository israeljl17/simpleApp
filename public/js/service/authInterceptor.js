app.factory('AuthInterceptor', function AuthInterceptor($location, AuthService, $q) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            if (AuthService.getToken()) {
                config.headers['access_token'] = AuthService.getToken();
            }

            return config;
        },

        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/usuarios/refresh');
                Materialize.toast("Sessão expirada.", 4000);
            }

            if (response.status === 403) {
                $location.path('/usuarios/login');
                Materialize.toast(response.data.msg, 4000);
            }

            return $q.reject(response);
        }
    }
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.authorize) {
            if (!AuthService.getToken()) {
                $rootScope.$evalAsync(function() {
                    $location.path('/usuarios/login');
                })
            }
        }
    });

});
