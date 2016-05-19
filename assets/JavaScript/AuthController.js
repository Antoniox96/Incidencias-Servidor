angular.module("AppIncidencias")
	.controller('AuthController', ['$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService',
		function AuthController($scope, $http, $location, $window, UserService, AuthenticationService) { 
			$scope.LogIn = function LogIn(username, password) {
				UserService.LogIn(username, password).success(function(data) {
					AuthenticationService.isLogged = true;
					$window.sessionStorage.token = data.token;
					console.log(data.token);
					$location.path("/");
				}).error(function(status, data) {
					$scope.Error = status;
				});
			}

			$scope.LogOut = function LogOut() {
				AuthenticationService.isLogged = false;
				delete $window.sessionStorage.token;
				$location.path("/login");
			}

			$scope.UserData = function UserData() {
				$http.get('/Perfil')
					.success(function(data) {
						console.log(data);
					})
					.error(function(error) {
						console.log(error);
					})

			}
		}
	]);