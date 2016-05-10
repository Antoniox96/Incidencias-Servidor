angular.module("AppIncidencias")
	.controller('AuthController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
		function AuthController($scope, $location, $window, UserService, AuthenticationService) { 

			$scope.LogIn = function LogIn(username, password) {
				if ( username !== undefined && password !== undefined ) {
					 UserService.LogIn(username, password).success(function(data) {
						AuthenticationService.isLogged = true;
						$window.sessionStorage.token = data.token;
						$location.path("/");
					 }).error(function(status, data) {
						console.log(status);
						console.log(data);
					 });
				}
			}

			$scope.LogOut = function LogOut() {
				if ( AuthenticationService.isLogged ) {
					AuthenticationService.isLogged = false;
					delete $window.sessionStorage.token;
					$location.path("/login");
				}
			}

		}
	]);