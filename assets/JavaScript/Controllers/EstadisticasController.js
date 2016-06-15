angular.module("AppIncidencias")

	.controller('EstadisticasController', function ($scope, $http, $timeout, SupervisorService) {

		$scope.Colaborador = {};
		$scope.Operador = {};
		$scope.Departamento = {};
		$scope.Ubicacion = {};
		$scope.Instalacion = {};
		$scope.TiposGrafico = [ { Nombre: "Queso", Value: "Pie" }, { Nombre: "Dónut", Value: "Doughnut" } ];
		$scope.TipoGrafico = {};
		$scope.TipoGrafico.Seleccionado = $scope.TiposGrafico[0];
		$scope.RadiusOptions = { 
							lines: 15,  length: 5, width: 10, radius: 25, scale: 1, corners: 0.8, color: '#009900', opacity: 0, 
							rotate: 0, direction: 1, speed: 1.5, trail: 50, fps: 20, zIndex: 2e9, className: 'spinner', top: '65%', 
							left: '50%', shadow: true, hwaccel: false, position: 'absolute' 
	                        		     	}
		$scope.RadiusOptionsError = { 
							lines: 15,  length: 5, width: 10, radius: 25, scale: 1, corners: 0.8, color: '#CC0000', opacity: 0, 
							rotate: 0, direction: 1, speed: 1.5, trail: 50, fps: 20, zIndex: 2e9, className: 'spinner', top: '65%', 
							left: '50%', shadow: true, hwaccel: false, position: 'absolute' 
	                        		     	}
		$scope.Secciones = [];
  		$scope.Datos = [];
  		$scope.Fechas = {};
  		$scope.Informacion = "Esperando a que introduzca la configuración para el gráfico.";

  		$scope.cargarDatos = function() {

  			SupervisorService.getColaboradores()

				.success(function(data) {

					$scope.Colaboradores = data.Colaboradores;
					$scope.Colaborador.Seleccionado = $scope.Colaboradores[0];

					SupervisorService.getOperadores()

						.success(function(data) {

							$scope.Operadores = data.Operadores;
							$scope.Operador.Seleccionado = $scope.Operadores[0];

							SupervisorService.getDepartamentos()

								.success(function(data) {

									$scope.Departamentos = data.DepartamentosJSON;
									$scope.Departamento.Seleccionado = $scope.Departamentos[0];
									$scope.Ubicacion.Seleccionada = $scope.Departamentos[0].Ubicaciones[0];
									$scope.Instalacion.Seleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];

									$scope.DatosCargados = true;

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

  		$scope.getEstadisticaGlobal = function() {

  			SupervisorService.EstadisticasGlobales($scope)

  				.success(function(data) {
  					$scope.Estadisticas = data.Estadisticas;

  					$scope.Secciones[0] = "Incidencias Totales";
  					$scope.Secciones[1] = "De Sistemas";
  					$scope.Secciones[2] = "De Mantenimiento";
  					$scope.Secciones[3] = "Comunes";
  					$scope.Secciones[4] = "No Comunes";
  					$scope.Secciones[5] = "Sin Asignar";
  					$scope.Secciones[6] = "Sin Iniciar";
  					$scope.Secciones[7] = "En Proceso";
  					$scope.Secciones[8] = "Pendiente";
  					$scope.Secciones[9] = "Completadas";

					$scope.Datos[0] = $scope.Estadisticas.Total;
					$scope.Datos[1] = $scope.Estadisticas.DeSistemas;
					$scope.Datos[2] = $scope.Estadisticas.DeMantenimiento;
					$scope.Datos[3] = $scope.Estadisticas.Comunes;
					$scope.Datos[4] = $scope.Estadisticas.NoComunes;
					$scope.Datos[5] = $scope.Estadisticas.SinAsignar;
					$scope.Datos[6] = $scope.Estadisticas.SinIniciar;
					$scope.Datos[7] = $scope.Estadisticas.EnProceso;
					$scope.Datos[8] = $scope.Estadisticas.Pendientes;
					$scope.Datos[9] = $scope.Estadisticas.Completadas;
					
					if ( $scope.Datos[0] > 0 ) {
						$scope.EstadisticasCargadas = true;
						angular.element($("chart-legend")).css({ 'display': 'block' });
					}
					else {
						$scope.EstadisticasCargadas = false;
						$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
						$timeout(function() {
								angular.element($("chart-legend")).css({ 'display': 'none' });
				    		}, 1);
					}
  				})

  				.error(function(error) {
  					$scope.EstadisticasCargadas = false;
					$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
					$timeout(function() {
						angular.element($("chart-legend")).css({ 'display': 'none' });
		    			}, 1);
				})
				
  		};

  		$scope.getEstadisticaColaborador = function() {

  			if ( $scope.Fechas.Inicio != null && $scope.Fechas.Fin != null ) {

  				delete $scope.Error;

  				if ( $scope.Fechas.Inicio < $scope.Fechas.Fin ) {

		  			SupervisorService.EstadisticasColaborador($scope)

		  				.success(function(data) {
		  					$scope.Estadisticas = data.Estadisticas;

		  					$scope.Secciones[0] = "Incidencias Creadas por Otros";
		  					$scope.Secciones[1] = "Incidencias Creadas por " + $scope.Colaborador.Seleccionado.Nombre;

							$scope.Datos[0] = $scope.Estadisticas.TotalTodos - $scope.Estadisticas.TotalColaborador;
							$scope.Datos[1] = $scope.Estadisticas.TotalColaborador;
							
							if ( $scope.Datos[0] > 0 && $scope.Datos[1] > 0 ) {
								$scope.EstadisticasCargadas = true;
								angular.element($("chart-legend")).css({ 'display': 'block' });
							}
							else {
								$scope.EstadisticasCargadas = false;
								$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
								$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
						    		}, 1);
							}
		  				})

		  				.error(function(error) {
		  					$scope.EstadisticasCargadas = false;
							$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
							$timeout(function() {
								angular.element($("chart-legend")).css({ 'display': 'none' });
				    			}, 1);
						})
				}
				else {
					$scope.EstadisticasCargadas = false;
					$scope.Error = "La primera fecha debe ser inferior a la segunda.";
					$timeout(function() {
						angular.element($("chart-legend")).css({ 'display': 'none' });
			    		}, 1);
				}
			}
			else {
				$scope.EstadisticasCargadas = false;
				$scope.Error = "El rango de fecha es incorrecto.";
				$timeout(function() {
					angular.element($("chart-legend")).css({ 'display': 'none' });
		    		}, 1);
			}

  		};

  		$scope.getEstadisticaOperador = function() {

  			if ( $scope.Fechas.Inicio != null && $scope.Fechas.Fin != null ) {

  				delete $scope.Error;

  				if ( $scope.Fechas.Inicio < $scope.Fechas.Fin ) {

		  			SupervisorService.EstadisticasOperador($scope)

		  				.success(function(data) {
		  					$scope.Estadisticas = data.Estadisticas;

		  					$scope.Secciones[0] = "Incidencias Asignadas a " + $scope.Operador.Seleccionado.Nombre;
		  					$scope.Secciones[1] = "Incidencias Sin Iniciar";
		  					$scope.Secciones[2] = "Incidencias En Proceso";
		  					$scope.Secciones[3] = "Incidencias Pendientes";
		  					$scope.Secciones[4] = "Incidencias Completadas";

							$scope.Datos[0] = $scope.Estadisticas.TotalAsignadas;
							$scope.Datos[1] = $scope.Estadisticas.SinIniciar;
							$scope.Datos[2] = $scope.Estadisticas.EnProceso;
							$scope.Datos[3] = $scope.Estadisticas.Pendiente;
							$scope.Datos[4] = $scope.Estadisticas.Completadas;

							if ( $scope.Datos[0] > 0 ) {
								$scope.EstadisticasCargadas = true;
								angular.element($("chart-legend")).css({ 'display': 'block' });
							}
							else {
								$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
						    		}, 1);
								$scope.EstadisticasCargadas = false;
								$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";

							}
		  				})

		  				.error(function(error) {
		  					$scope.EstadisticasCargadas = false;
							$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
							$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
					    		}, 1);
						})
				}
				else {
					$scope.EstadisticasCargadas = false;
					$scope.Error = "La primera fecha debe ser inferior a la segunda.";
					$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
			    		}, 1);
				}
			}
			else {
				$scope.EstadisticasCargadas = false;
				$scope.Error = "El rango de fecha es incorrecto.";
				$timeout(function() {
					angular.element($("chart-legend")).css({ 'display': 'none' });
		    		}, 1);
			}

  		};

  		$scope.getEstadisticaInstalacion = function() {

  			if ( $scope.Fechas.Inicio != null && $scope.Fechas.Fin != null ) {

  				delete $scope.Error;

  				if ( $scope.Fechas.Inicio < $scope.Fechas.Fin ) {

		  			SupervisorService.EstadisticasInstalacion($scope)

		  				.success(function(data) {
		  					$scope.Estadisticas = data.Estadisticas;

		  					$scope.Secciones[0] = "Incidencias Totales en " + $scope.Instalacion.Seleccionada.Nombre;
		  					$scope.Secciones[1] = "Incidencias Sin Asignar";
		  					$scope.Secciones[2] = "Incidencias de Sistemas";
		  					$scope.Secciones[3] = "Incidencias de Mantenimiento";
		  					$scope.Secciones[4] = "Incidencias Sin Iniciar";
		  					$scope.Secciones[5] = "Incidencias En Proceso";
		  					$scope.Secciones[6] = "Incidencias Pendientes";
		  					$scope.Secciones[7] = "Incidencias Completadas";
		  					
							$scope.Datos[0] = $scope.Estadisticas.Total;
							$scope.Datos[1] = $scope.Estadisticas.SinAsignar;
							$scope.Datos[2] = $scope.Estadisticas.DeSistemas;
							$scope.Datos[3] = $scope.Estadisticas.DeMantenimiento;
							$scope.Datos[4] = $scope.Estadisticas.SinIniciar;
							$scope.Datos[5] = $scope.Estadisticas.EnProceso;
							$scope.Datos[6] = $scope.Estadisticas.Pendiente;
							$scope.Datos[7] = $scope.Estadisticas.Completadas;

							if ( $scope.Datos[0] > 0 ) {
								$scope.EstadisticasCargadas = true;
								angular.element($("chart-legend")).css({ 'display': 'block' });
							}
							else {
								$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
						    		}, 1);
								$scope.EstadisticasCargadas = false;
								$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";

							}
		  				})

		  				.error(function(error) {
		  					$scope.EstadisticasCargadas = false;
							$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
							$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
					    		}, 1);
						})
				}
				else {
					$scope.EstadisticasCargadas = false;
					$scope.Error = "La primera fecha debe ser inferior a la segunda.";
					$timeout(function() {
  									angular.element($("chart-legend")).css({ 'display': 'none' });
			    		}, 1);
				}
			}
			else {
				$scope.EstadisticasCargadas = false;
				$scope.Error = "El rango de fecha es incorrecto.";
				$timeout(function() {
					angular.element($("chart-legend")).css({ 'display': 'none' });
		    		}, 1);
			}

  		};

		$scope.setUbicacion = function() {
			$scope.Ubicacion.Seleccionada = $scope.Departamentos[$scope.Departamento.Seleccionado.id - 1].Ubicaciones[0];
			$scope.setInstalacion();
		};

		$scope.setInstalacion = function() {
			$scope.Instalacion.Seleccionada =$scope.Ubicacion.Seleccionada.Instalaciones[0];		
		};

		$scope.clear = function() {
			$scope.EstadisticasCargadas = false;
			delete $scope.Error;
			$timeout(function() {
				angular.element($("chart-legend")).css({ 'display': 'none' });
	    		}, 1);
		};

	});