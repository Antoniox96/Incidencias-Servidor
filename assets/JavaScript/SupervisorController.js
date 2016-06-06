angular.module("AppIncidencias")

	.controller('SupervisorController', function ($scope, $filter, $route, $routeParams, $http, $timeout, $uibModalInstance, IncidenciaID) {

		$scope.DepartamentoSeleccionado;
		$scope.UbicacionSeleccionada;
		$scope.InstalacionSeleccionada;
		$scope.Departamentos = [];
		$scope.TiposIncidencia;
		$scope.TipoSeleccionado;
		$scope.PrioridadesIncidencia;
		$scope.PrioridadSeleccionada;
		$scope.EstadosIncidencia;
		$scope.EstadoSeleccionado;
		$scope.Operadores;
		$scope.OperadorSeleccionado;
		$scope.FechaInicio;
		$scope.FechaPrevista;
		$scope.FechaFin;

		$scope.getDepartamentos = function() {
			$http.get('/Departamento')
				.success(function(data) {
					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.getTiposIncidencia = function() {
			$http.get('/TiposIncidencia')
				.success(function(data) {
					$scope.TiposIncidencia = data.Tipos;
					$scope.TipoSeleccionado = $scope.TiposIncidencia[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};


		$scope.getPrioridadesIncidencia = function() {
			$http.get('/PrioridadesIncidencia')
				.success(function(data) {
					$scope.PrioridadesIncidencia = data.Prioridades;
					$scope.PrioridadSeleccionada = $scope.PrioridadesIncidencia[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.getEstadosIncidencia = function() {
			$http.get('/EstadosIncidencia')
				.success(function(data) {
					$scope.EstadosIncidencia = data.Estados;
					$scope.EstadoSeleccionado = $scope.EstadosIncidencia[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.getOperadores = function() {
			$http.get('/Operadores')
				.success(function(data) {
					$scope.Operadores = data.Operadores;
					$scope.Operadores.unshift({"Nombre": "Sin ", "Apellidos": "Asignar"});
					$scope.OperadorSeleccionado = $scope.Operadores[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.getIncidencia = function () {
			$http.get('/Incidencia/' + IncidenciaID)
				.success(function(data) {
					$scope.Titulo = data.IncidenciaJSON.Titulo;
					$scope.Descripcion = data.IncidenciaJSON.Descripcion;
					$scope.Instalacion = data.IncidenciaJSON.Instalacion;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.setDepartamento(data.IncidenciaJSON.Instalacion.ID);
					$scope.setTipoIncidencia(data.IncidenciaJSON.Tipo);
					$scope.setPrioridadIncidencia(data.IncidenciaJSON.Prioridad);
					$scope.setEstadoIncidencia(data.IncidenciaJSON.Estado);
					$scope.setOperadorIncidencia(data.IncidenciaJSON.Operador);
					$scope.FechaInicio = new Date(data.IncidenciaJSON.FechaInicio);
					$scope.FechaPrevista = new Date(data.IncidenciaJSON.FechaInicio);
					$scope.FechaFin = new Date(data.IncidenciaJSON.FechaInicio);

				})
				.error(function(error) {
					console.log(error);
				});
		};

		$scope.setUbicacion = function() {
			$scope.UbicacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id - 1].Ubicaciones[0];
			$scope.setInstalacion();
		};

		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada =$scope.UbicacionSeleccionada.Instalaciones[0];		
		};

		$scope.setDepartamento = function(InstalacionID) {
			$timeout(function() {
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
			}, 50 );
		}


		$scope.setTipoIncidencia = function(Tipo) {
			$timeout(function() {
					for ( var i = 0 ; i < $scope.TiposIncidencia.length ; i++ ) {
						if ( $scope.TiposIncidencia[i] == Tipo ) {
							$scope.TipoSeleccionado = $scope.TiposIncidencia[i];
						}
					}
			}, 50 );
		}

		$scope.setPrioridadIncidencia = function(Prioridad) {
			$timeout(function() {
					for ( var i = 0 ; i < $scope.PrioridadesIncidencia.length ; i++ ) {
						if ( $scope.PrioridadesIncidencia[i] == Prioridad ) {
							$scope.PrioridadSeleccionada = $scope.PrioridadesIncidencia[i];
						}
					}
			}, 50 );
		}

		$scope.setEstadoIncidencia = function(Estado) {
			$timeout(function() {
					for ( var i = 0 ; i < $scope.EstadosIncidencia.length ; i++ ) {
						if ( $scope.EstadosIncidencia[i] == Estado ) {
							$scope.EstadoSeleccionado = $scope.EstadosIncidencia[i];
						}
					}
			}, 50 );
		}

		$scope.setOperadorIncidencia = function(Operador) {
			$timeout(function() {
					for ( var i = 0 ; i < $scope.Operadores.length ; i++ ) {
						if ( $scope.Operadores[i].ID == Operador.ID ) {
							$scope.OperadorSeleccionado = $scope.Operadores[i];
						}
					}
			}, 50 );
		}

		$scope.CrearIncidencia = function () {
			$http.post('/Incidencia', { 
								Titulo: $scope.Titulo, 
						    		Descripcion: $scope.Descripcion, 
					    			Departamento: $scope.DepartamentoSeleccionado, 
					    			Ubicacion: $scope.UbicacionSeleccionada, 
					    			Instalacion: $scope.InstalacionSeleccionada, 
					    			Tipo: $scope.TipoSeleccionado, 
					    			Prioridad: $scope.PrioridadSeleccionada, 
					    			Estado: $scope.EstadoSeleccionado, 
					    			Operador: $scope.OperadorSeleccionado.ID, 
					    			FechaInicio: $scope.FechaInicio, 
					    			FechaPrevista: $scope.FechaPrevista, 
					    			FechaFin: $scope.FechaFin
					    		})
				.success(function(data) {
					$route.reload();
				})
				.error(function(error) {
					console.log(error);
				});

			$timeout(function() {
				$route.reload();
			}, 50 );

			$uibModalInstance.close();
		};

		$scope.EditarIncidencia = function () {
						console.log($scope.InstalacionSeleccionada);

			$http.post('/Incidencia/' + IncidenciaID, { 
								Titulo: $scope.Titulo, 
						    		Descripcion: $scope.Descripcion, 
					    			Instalacion: $scope.InstalacionSeleccionada, 
					    			Tipo: $scope.TipoSeleccionado, 
					    			Prioridad: $scope.PrioridadSeleccionada, 
					    			Estado: $scope.EstadoSeleccionado, 
					    			Operador: $scope.OperadorSeleccionado.ID, 
					    			FechaInicio: $scope.FechaInicio, 
					    			FechaPrevista: $scope.FechaPrevista, 
					    			FechaFin: $scope.FechaFin
					    		})
				.success(function(data) {
					$route.reload();
				})
				.error(function(error) {
					console.log(error);
				});	

			$timeout(function() {
				$route.reload();
			}, 50 );

			$uibModalInstance.close();
		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
			$timeout(function() {
				$route.reload();
			}, 50 );
		};

	});