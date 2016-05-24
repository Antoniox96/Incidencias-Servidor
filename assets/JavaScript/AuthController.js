angular.module("AppIncidencias")
	.controller('AuthController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
		function AuthController($scope, $location, $window, UserService, AuthenticationService) { 
			$scope.LogIn = function LogIn(username, password) {
				UserService.LogIn(username, password)
					.success(function(data) {
						AuthenticationService.isLogged = true;
						$window.sessionStorage.token = data.token;
						$location.path("/");
					}).error(function(status, data) {
						$scope.Error = status;
					});
			}
		}
	]);