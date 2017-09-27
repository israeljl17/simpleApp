app.factory('AuthService', function AuthService($localStorage, $q) {
    return {
        getUsuario: function() {
            return $localStorage.usuario;
        },
        setUsuario: function(usuario) {
            $localStorage.usuario = usuario;
        },
        getToken: function() {
            return $localStorage.token;
        },
        setToken: function(token) {
            $localStorage.token = token;
        },
        logout: function(data) {
            delete $localStorage.token;
            $q.when();
        }
    };
});
