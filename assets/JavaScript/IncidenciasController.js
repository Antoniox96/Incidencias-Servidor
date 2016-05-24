angular.module("AppIncidencias")

	.controller("IncidenciasController", function ($scope, $http, $rootScope, $uibModal) {

		$scope.Incidencias = [];

		if ( $scope.Incidencias.length == 0 ) {
			$http.get("/Incidencia")
				.success(function (data) {
					$scope.Incidencias = data;
				})
				.error(function (error) {
					$scope.Error = error;
				});
		}

		$scope.CrearIncidencia = function () {

			if ( $rootScope.Rol == '1' ) {
				$uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: "Vistas/Formularios/Supervisor/Crear Incidencia.html",
					controller: 'SupervisorController',
					size: 'md',
					resolve: {
						IncidenciaID: null
					}
				});
			}

			else if ( $rootScope.Rol == '3' ) {
				$uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: "Vistas/Formularios/Colaborador/Crear Incidencia.html",
					controller: 'ColaboradorController',
					size: 'md',
					resolve: {
						IncidenciaID: null
					}
				});
			}

		};

		$scope.EditarIncidencia = function (IncidenciaID) {
			
			if ( $rootScope.Rol == '1' ) {
				$uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: "Vistas/Formularios/Supervisor/Editar Incidencia.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						IncidenciaID: IncidenciaID
					}
				});
			}

			else if ( $rootScope.Rol == '3' ) {
				$uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: "Vistas/Formularios/Colaborador/Editar Incidencia.html",
					controller: 'ColaboradorController',
					size: 'md',
					resolve: {
						IncidenciaID: IncidenciaID
					}			
			   	});
			}

		};

	});