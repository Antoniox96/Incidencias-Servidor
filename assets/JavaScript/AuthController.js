angular.module("AppIncidencias")
	.controller('AuthController', ['$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService',
		function AuthController($scope, $http, $location, $window, UserService, AuthenticationService) { 
			$scope.LogIn = function LogIn(username, password) {
				UserService.LogIn(username, password).success(function(data) {
					AuthenticationService.isLogged = true;
					$window.sessionStorage.token = data.token;
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
						$scope.NickName = data.NickName;
						$scope.Nombre = data.Nombre;
						$scope.Apellidos = data.Apellidos;
						$scope.Email = data.Email;
					})
					.error(function(error) {
						console.log(error);
					})

			}
		}
	]);