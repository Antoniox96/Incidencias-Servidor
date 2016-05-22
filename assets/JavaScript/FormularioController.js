angular.module("AppIncidencias")

	.controller("FormularioController", function ($scope, $rootScope, $uibModal) {

		$scope.Formulario = function (size) {

			if ( $rootScope.Rol == '1' ) {
				$uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: "Vistas/Formularios/Supervisor/Crear Incidencia.html",
					controller: 'SupervisorController',
					size: size
				});
			}

			else if ( $rootScope.Rol == '3' ) {
				$uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: "Vistas/Formularios/Colaborador/Crear Incidencia.html",
					controller: 'ColaboradorController',
					size: size
				});
			}

		};

	});