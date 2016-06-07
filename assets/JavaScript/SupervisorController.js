angular.module("AppIncidencias")

	.controller('SupervisorController', function ($scope, $filter, $route, $routeParams, $http, $timeout, $uibModalInstance, IncidenciaID, SupervisorService) {

		$scope.DatosCargados = false;

		$scope.cargarDatos = function() {

			SupervisorService.getDepartamentos()

				.success(function(data) {

					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];

					SupervisorService.getOperadores()

						.success(function(data) {

							$scope.Operadores = data.Operadores;
							$scope.Operadores.unshift({"Nombre": "Sin ", "Apellidos": "Asignar", "ID": 0});
							$scope.OperadorSeleccionado = $scope.Operadores[0];

							SupervisorService.getEstadosIncidencia()

								.success(function(data) {

									$scope.EstadosIncidencia = data.Estados;
									$scope.EstadoSeleccionado = $scope.EstadosIncidencia[0];

									SupervisorService.getPrioridadesIncidencia()

										.success(function(data) {

											$scope.PrioridadesIncidencia = data.Prioridades;
											$scope.PrioridadSeleccionada = $scope.PrioridadesIncidencia[0];

											SupervisorService.getTiposIncidencia()

												.success(function(data) {

													$scope.TiposIncidencia = data.Tipos;
													$scope.TipoSeleccionado = $scope.TiposIncidencia[0];

													if ( IncidenciaID != null ) {
														SupervisorService.getIncidencia(IncidenciaID)

															.success(function(data) {
																$scope.Titulo = data.IncidenciaJSON.Titulo;
																$scope.Descripcion = data.IncidenciaJSON.Descripcion;
																$scope.Instalacion = data.IncidenciaJSON.Instalacion;
																$scope.setDepartamento(data.IncidenciaJSON.Instalacion.ID);
																$scope.setTipoIncidencia(data.IncidenciaJSON.Tipo);
																$scope.setPrioridadIncidencia(data.IncidenciaJSON.Prioridad);
																$scope.setEstadoIncidencia(data.IncidenciaJSON.Estado);
																$scope.setOperadorIncidencia(data.IncidenciaJSON.Operador);
																$scope.FechaInicio = new Date(data.IncidenciaJSON.FechaInicio);
																$scope.FechaPrevista = new Date(data.IncidenciaJSON.FechaPrevista);
																$scope.FechaFin = new Date(data.IncidenciaJSON.FechaFin);

																$scope.DatosCargados = true;

															})
															.error(function(error) {
																console.log(error);
															});
													}

												})
												.error(function(error) {
													console.log(error);
												})

										})
										.error(function(error) {
											console.log(error);
										})

								})

								.error(function(error) {
									console.log(error);
								})

						})

						.error(function(error) {
							console.log(error);
						})

				})

				.error(function(error) {
					console.log(error);
				})

		};

		$scope.setUbicacion = function() {
			$scope.UbicacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id - 1].Ubicaciones[0];
			$scope.setInstalacion();
		};

		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada =$scope.UbicacionSeleccionada.Instalaciones[0];		
		};

		$scope.setDepartamento = function(InstalacionID) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == InstalacionID ) {
							$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
							$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n];
							$scope.InstalacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m];
						}
					}						
				}
			}
		}


		$scope.setTipoIncidencia = function(Tipo) {
			for ( var i = 0 ; i < $scope.TiposIncidencia.length ; i++ ) {
				if ( $scope.TiposIncidencia[i] == Tipo ) {
					$scope.TipoSeleccionado = $scope.TiposIncidencia[i];
				}
			}
		}

		$scope.setPrioridadIncidencia = function(Prioridad) {
			for ( var i = 0 ; i < $scope.PrioridadesIncidencia.length ; i++ ) {
				if ( $scope.PrioridadesIncidencia[i] == Prioridad ) {
					$scope.PrioridadSeleccionada = $scope.PrioridadesIncidencia[i];
				}
			}
		}

		$scope.setEstadoIncidencia = function(Estado) {
			for ( var i = 0 ; i < $scope.EstadosIncidencia.length ; i++ ) {
				if ( $scope.EstadosIncidencia[i] == Estado ) {
					$scope.EstadoSeleccionado = $scope.EstadosIncidencia[i];
				}
			}
		}

		$scope.setOperadorIncidencia = function(Operador) {
			for ( var i = 0 ; i < $scope.Operadores.length ; i++ ) {
				if ( $scope.Operadores[i].ID == Operador.ID ) {
					$scope.OperadorSeleccionado = $scope.Operadores[i];
				}
			}
		}

		$scope.CrearIncidencia = function () {

			SupervisorService.CrearIncidencia($scope)

				.success(function(data) {
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });

		};

		$scope.EditarIncidencia = function () {

			SupervisorService.EditarIncidencia($scope, IncidenciaID)
			
				.success(function(data) {
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });

		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});