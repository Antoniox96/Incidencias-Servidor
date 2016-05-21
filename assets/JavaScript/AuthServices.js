angular.module("AppIncidencias")

	.factory('AuthenticationService', function() {
		var auth = {
			isLogged: false
		}
	  
		return auth;
	})

	.factory('UserService', function($http) {
		return {
			LogIn: function(username, password) {
				return $http.post('/auth', { username: username, password: password });
			},

			userData: function() {
				return $http.get('/Perfil');
			},
	 
			LogOut: function() {
	 			AuthenticationService.isLogged = false;
				delete $window.sessionStorage.token;
				$location.path("/login");
			}
		}
	})

	.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
		return {
			request: function (config) {
				config.headers = config.headers || {};

				if ( $window.sessionStorage.token ) {
				 	config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
				}

				return config;
			},

			requestError: function(rejection) {
				return $q.reject(rejection);
			},

			response: function (response) {
				if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isLogged) {
					AuthenticationService.isLogged = true;
				}

				return response || $q.when(response);
			},

			responseError: function(rejection) {
				if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isLogged)) {
					delete $window.sessionStorage.token;
					AuthenticationService.isLogged = false;
					$location.path("/login");
				}

				return $q.reject(rejection);
			}
		};
	});