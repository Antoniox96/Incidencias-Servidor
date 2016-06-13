angular.module("AppIncidencias")

	.controller('EstadisticasController', function ($scope, $http, $timeout, SupervisorService) {

		$scope.Colaborador = {};
		$scope.Operador = {};
		$scope.TiposGrafico = [ { Nombre: "Queso", Value: "Pie" }, { Nombre: "Dónut", Value: "Doughnut" } ];
		$scope.TipoGrafico = {};
		$scope.TipoGrafico.Seleccionado = $scope.TiposGrafico[0];
		$scope.RadiusOptions = { 
							lines: 15,  length: 5, width: 10, radius: 25, scale: 2, corners: 0.8, color: '#337AB7', opacity: 0, 
							rotate: 0, direction: 1, speed: 1.5, trail: 50, fps: 20, zIndex: 2e9, className: 'spinner', top: '50%', 
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

  		$scope.cargarDatos = function() {

  			SupervisorService.getColaboradores()

						.success(function(data) {

							$scope.Colaboradores = data.Colaboradores;
							$scope.Colaborador.Seleccionado = $scope.Colaboradores[0];

							SupervisorService.getOperadores()

								.success(function(data) {

									$scope.Operadores = data.Operadores;
									$scope.Operador.Seleccionado = $scope.Operadores[0];

									$scope.DatosCargados = true;

								})

								.error(function(error) {
									console.log(error);
								})

						})

						.error(function(error) {
							console.log(error);
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

	});