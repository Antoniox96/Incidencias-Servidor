angular.module("AppIncidencias")

	.controller("IncidenciasController", function ($scope, $window, $http, $route, $timeout, $rootScope, $log, $uibModal) {

		$scope.Incidencias = [];
		$scope.IncidenciaSeleccionada = null;
		
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

			if ( $rootScope.Rol == '1' || $rootScope.Rol == '3' ) {
				for ( var i = 0 ; i < $scope.Incidencias.length ; i++ ) {
					if ( $scope.Incidencias[i].id == Incidencia ) {
						if ( Incidencia != $scope.IncidenciaSeleccionada) {
							$scope.IncidenciaSeleccionada = Incidencia;
							$scope.Comun = $scope.Incidencias[i].Comun;
						}
						else {
							$scope.IncidenciaSeleccionada = null;
							$scope.Comun = null;
						}
					}
				}
			}
			else if ( $rootScope.Rol == '2' ) {
				for ( var i = 0 ; i < $scope.Incidencias.length ; i++ ) {
					if ( $scope.Incidencias[i].id == Incidencia ) {
						if ( $scope.Incidencias[i].Operador == $rootScope.ID ) {
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

		$scope.ActivarFiltro = function () {
			if( $rootScope.Rol == '1' ) {
				$scope.Activo =  ($scope.Activo == $scope.Activo) ? !$scope.Activo : false;
			}
		};

		$scope.CrearIncidencia = function () {

			if ( $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Crear Incidencia.html",
					controller: 'SupervisorController',
					size: 'lg',
					resolve: {
						IncidenciaID: null,
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: null
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
							IncidenciaID: $scope.IncidenciaSeleccionada,
							DepartamentoID: null,
							UbicacionID: null,
							InstalacionID: null,
							UsuarioID: null
						}
					});
				}

				else if ( $rootScope.Rol == '2' ) {

					$scope.EstadosIncidencia = "";
					$scope.EstadoSeleccionado = "";

					$scope.getEstadosIncidencia = function() {
						return $http.get('/EstadosIncidencia');
					};

					$scope.setEstadoIncidencia = function(Estado) {
						for ( var i = 0 ; i < $scope.EstadosIncidencia.length ; i++ ) {
							if ( Estado == $scope.EstadosIncidencia[i] ) {
								$scope.EstadoSeleccionado = $scope.EstadosIncidencia[i];
							}
						}
					}

					$scope.updateEstadoIncidencia = function() {
						return $http.post('/Incidencia/' + $scope.IncidenciaSeleccionada, { Estado: $scope.EstadoSeleccionado });
					}

					$scope.getEstadosIncidencia()

						.success(function(data) {
							$scope.EstadosIncidencia = data.Estados;
							$scope.setEstadoIncidencia(Estado);

							if ( $scope.EstadoSeleccionado != null && $scope.EstadoSeleccionado != "" ) {
								if ( $scope.EstadoSeleccionado == 'Pendiente' ) {
									$uibModal.open({
										templateUrl: "Vistas/Formularios/Operador/Editar Incidencia.html",
										controller: 'OperadorController',
										scope: $scope,
										size: 'md',
										resolve: {
											IncidenciaID: $scope.IncidenciaSeleccionada
										}
									});
								}
								else {				
									$scope.updateEstadoIncidencia()

										.success(function(data) {
											$route.reload();
										})

										.error(function(error) {
											console.log(error);
										});
								}
							}
						})

						.error(function(error) {
							console.log(error);
						})
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

		$scope.setUnsetComun = function() {
			if ( $rootScope.Rol == '1' ) {
				if ( $scope.IncidenciaSeleccionada != null ) {
					if ( $scope.Comun == 'Sí' ) {
						$scope.Comun = 'No';
					}
					else {
						$scope.Comun = 'Sí';
					}

					$http.post('/Incidencia/' + $scope.IncidenciaSeleccionada + '/setUnsetComun', {Comun: $scope.Comun})
						.success(function(data) {
							$route.reload();
						})
						.error(function(error) {
							console.log(error);
						});	

					$timeout(function() {
						$route.reload();
					}, 50 );
				}
				else {
					$window.alert('No se ha seleccionado ninguna incidencia.');
				}
			}
		}

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