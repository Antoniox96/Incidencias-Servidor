angular.module("AppIncidencias")

	.controller('HeaderController', ['$scope', '$http', '$location', '$window', 'AuthenticationService',
		function HeaderController($scope, $http, $location, $window, AuthenticationService) { 

			$scope.LogOut = function LogOut() {
				AuthenticationService.isLogged = false;
				delete $window.sessionStorage.token;
				$location.path("/login");
			}

		}

	]);