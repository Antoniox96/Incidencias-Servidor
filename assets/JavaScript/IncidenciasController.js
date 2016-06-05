angular.module("AppIncidencias")

	.controller("IncidenciasController", function ($scope, $window, $http, $route, $timeout, $rootScope, $log, $uibModal) {

		$scope.Incidencias = [];
		$scope.IncidenciaSeleccionada;

		if ( $scope.Incidencias.length == 0 ) {
			$http.get("/Incidencia")
				.success(function (data) {
					$scope.Incidencias = data.IncidenciasJSON;
				})
				.error(function (error) {
					$scope.Error = error;
				});
		}

		$scope.setIncidenciaSeleccionada = function(Incidencia) {

			if ( $rootScope.Rol == '1' ) {
				for ( var i = 0 ; i < $scope.Incidencias.length ; i++ ) {
					if ( $scope.Incidencias[i].id == Incidencia ) {
						if ( Incidencia != $scope.IncidenciaSeleccionada) {
							$scope.IncidenciaSeleccionada = Incidencia;
						}
						else {
							$scope.IncidenciaSeleccionada = null;
						}
					}
				}
			}
			else {
				for ( var i = 0 ; i < $scope.Incidencias.length ; i++ ) {
					if ( $scope.Incidencias[i].id == Incidencia ) {
						if ( $scope.Incidencias[i].Comun == 'No' ) {
							if ( Incidencia != $scope.IncidenciaSeleccionada) {
								$scope.IncidenciaSeleccionada = Incidencia;
							}
							else {
								$scope.IncidenciaSeleccionada = null;
							}
						}
						else {
							$scope.IncidenciaSeleccionada = null;
						}
					}
				}
			}
		}

		$scope.CrearIncidencia = function () {

			if ( $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Crear Incidencia.html",
					controller: 'SupervisorController',
					size: 'lg',
					resolve: {
						IncidenciaID: null
					}
				});
			}

			else if ( $rootScope.Rol == '3' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Colaborador/Crear Incidencia.html",
					controller: 'ColaboradorController',
					size: 'md',
					resolve: {
						IncidenciaID: null
					}
				});
			}

		};

		$scope.EditarIncidencia = function (Estado) {
			
			if ( $scope.IncidenciaSeleccionada != null ) {
				if ( $rootScope.Rol == '1' ) {
					$uibModal.open({
						templateUrl: "Vistas/Formularios/Supervisor/Editar Incidencia.html",
						controller: 'SupervisorController',
						scope: $scope,
						size: 'lg',
						resolve: {
							IncidenciaID: $scope.IncidenciaSeleccionada
						}
					});
				}

				else if ( $rootScope.Rol == '2' ) {

					$scope.EstadosIncidencia = "";
					$scope.EstadoSeleccionado = "";

					$scope.getEstadosIncidencia = function() {
						$http.get('/EstadosIncidencia')
							.success(function(data) {
								$scope.EstadosIncidencia = data.Estados;
							})
							.error(function(error) {
								console.log(error);
							})
					};

					$scope.setEstadoIncidencia = function(Estado) {
						for ( var i = 0 ; i < $scope.EstadosIncidencia.length ; i++ ) {
							if ( Estado == $scope.EstadosIncidencia[i] ) {
								$scope.EstadoSeleccionado = $scope.EstadosIncidencia[i];
							}
						}
					}

					$scope.getEstadosIncidencia();

					$timeout(function() {
						$scope.setEstadoIncidencia(Estado);
					}, 50);

					$timeout(function() {
						if ( $scope.EstadoSeleccionado != null && $scope.EstadoSeleccionado != "" ) {
							$http.post('/Incidencia/' + $scope.IncidenciaSeleccionada, { Estado: $scope.EstadoSeleccionado })
								.success(function(data) {
									$route.reload();
								})
								.error(function(error) {
									console.log(error);
								});	

							$timeout(function() {
								$route.reload();
							}, 10 );
						}
					}, 50);

				}

				else if ( $rootScope.Rol == '3' ) {
					$uibModal.open({
						templateUrl: "Vistas/Formularios/Colaborador/Editar Incidencia.html",
						controller: 'ColaboradorController',
						size: 'md',
						resolve: {
							IncidenciaID: $scope.IncidenciaSeleccionada
						}			
				   	});
				}
			}
			else {
					$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};

		$scope.BorrarIncidencia = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.delete('/Incidencia/' + $scope.IncidenciaSeleccionada)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}

		};

	});