angular.module("AppIncidencias")

	.controller('EstadisticasController', function ($scope, $http, $timeout, $window, SupervisorService) {

		$scope.Colaborador = {};
		$scope.Operador = {};
		$scope.Departamento = {};
		$scope.Ubicacion = {};
		$scope.Instalacion = {};
		$scope.TiposGrafico = [ { Nombre: "Queso", Value: "pie" }, { Nombre: "Dónut", Value: "doughnut" } ];
		$scope.TipoGrafico = {};
		$scope.TipoGrafico.Seleccionado = $scope.TiposGrafico[0];
		$scope.RadiusOptions = { 
							lines: 15,  length: 5, width: 10, radius: 25, scale: 1, corners: 0.8, color: '#009900', opacity: 0, 
							rotate: 0, direction: 1, speed: 1.5, trail: 50, fps: 20, zIndex: 2e9, className: 'spinner', top: '75%', 
							left: '50%', shadow: true, hwaccel: false, position: 'absolute' 
	                        		     	};
		$scope.RadiusOptionsError = { 
							lines: 15,  length: 5, width: 10, radius: 25, scale: 1, corners: 0.8, color: '#CC0000', opacity: 0, 
							rotate: 0, direction: 1, speed: 1.5, trail: 50, fps: 20, zIndex: 2e9, className: 'spinner', top: '75%', 
							left: '50%', shadow: true, hwaccel: false, position: 'absolute' 
	                        		     	};
		$scope.Graficos = {	
						TipoIncidencia: { Secciones: [], Datos: [] }, 
						TipoComun: { Secciones: [], Datos: [] }, 
						TipoEstado: { Secciones: [], Datos: [] },
						Colaborador: { Secciones: [], Datos: [] },
						Opciones: { responsive: false },
						Colores: [ "#B32D00", "#00B36B", "#CC00CC", "#9999FF", "#000066", "#FFFF00", "#FF9900" ]
					};

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

  					$scope.Graficos.TipoIncidencia.Secciones[0] = "De Sistemas";
  					$scope.Graficos.TipoIncidencia.Secciones[1] = "De Mantenimiento";

  					$scope.Graficos.TipoComun.Secciones[0] = "Comunes";
  					$scope.Graficos.TipoComun.Secciones[1] = "No Comunes";

  					$scope.Graficos.TipoEstado.Secciones[0] = "Sin Iniciar";
  					$scope.Graficos.TipoEstado.Secciones[1] = "En Proceso";
  					$scope.Graficos.TipoEstado.Secciones[2] = "Pendiente";
  					$scope.Graficos.TipoEstado.Secciones[3] = "Completadas";

					$scope.Graficos.TipoIncidencia.Datos[0] = $scope.Estadisticas.DeSistemas;
					$scope.Graficos.TipoIncidencia.Datos[1] = $scope.Estadisticas.DeMantenimiento;

					$scope.Graficos.TipoComun.Datos[0] = $scope.Estadisticas.Comunes;
					$scope.Graficos.TipoComun.Datos[1] = $scope.Estadisticas.NoComunes;

					$scope.Graficos.TipoEstado.Datos[0] = $scope.Estadisticas.SinIniciar;
					$scope.Graficos.TipoEstado.Datos[1] = $scope.Estadisticas.EnProceso;
					$scope.Graficos.TipoEstado.Datos[2] = $scope.Estadisticas.Pendientes;
					$scope.Graficos.TipoEstado.Datos[3] = $scope.Estadisticas.Completadas;

					if ( $scope.Estadisticas.Total > 0 ) {
						$scope.EstadisticasCargadas = true;
						$scope.EstadisticasTipoCargadas = true;
						$scope.EstadisticasComunCargadas = true;
						$scope.EstadisticasEstadoCargadas = true;
					}
					else {
						$scope.EstadisticasCargadas = false;
						$scope.EstadisticasTipoCargadas = false;
						$scope.EstadisticasComunCargadas = false;
						$scope.EstadisticasEstadoCargadas = false;
						$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
					}
  				})

  				.error(function(error) {
						$scope.EstadisticasCargadas = false;
						$scope.EstadisticasTipoCargadas = false;
						$scope.EstadisticasComunCargadas = false;
						$scope.EstadisticasEstadoCargadas = false;					
						$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
				})
				
  		};

  		$scope.getEstadisticaColaborador = function() {

  			if ( $scope.Fechas.Inicio != null && $scope.Fechas.Fin != null ) {

  				delete $scope.Error;

  				if ( $scope.Fechas.Inicio < $scope.Fechas.Fin ) {

		  			SupervisorService.EstadisticasColaborador($scope)

		  				.success(function(data) {
		  					$scope.Estadisticas = data.Estadisticas;

		  					$scope.Graficos.Colaborador.Secciones[0] = "Creadas por Otros";
		  					$scope.Graficos.Colaborador.Secciones[1] = "Creadas por " + $scope.Colaborador.Seleccionado.Nombre;

							$scope.Graficos.Colaborador.Datos[0] = $scope.Estadisticas.TotalTodos - $scope.Estadisticas.TotalColaborador;
							$scope.Graficos.Colaborador.Datos[1] = $scope.Estadisticas.TotalColaborador;
							
							if ( $scope.Estadisticas.TotalColaborador > 0 ) {
								$scope.EstadisticasCargadas = true;
								$scope.EstadisticasColaboradorCargadas = true;
							}
							else {
								$scope.EstadisticasCargadas = false;
								$scope.EstadisticasColaboradorCargadas = false;
								$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
							}
		  				})

		  				.error(function(error) {
		  					$scope.EstadisticasCargadas = false;
							$scope.EstadisticasColaboradorCargadas = false;
							$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
						})
				}
				else {			
					$scope.EstadisticasCargadas = false;					
					$scope.EstadisticasColaboradorCargadas = false;
					$scope.Error = "La primera fecha debe ser inferior a la segunda.";
				}
			}
			else {
				$scope.EstadisticasCargadas = false;
				$scope.EstadisticasColaboradorCargadas = false;
				$scope.Error = "El rango de fecha es incorrecto.";
			}

  		};

  		$scope.getEstadisticaOperador = function() {

  			if ( $scope.Fechas.Inicio != null && $scope.Fechas.Fin != null ) {

  				delete $scope.Error;

  				if ( $scope.Fechas.Inicio < $scope.Fechas.Fin ) {

		  			SupervisorService.EstadisticasOperador($scope)

		  				.success(function(data) {
		  					$scope.Estadisticas = data.Estadisticas;

	  						$scope.Graficos.TipoEstado.Secciones[0] = "Sin Iniciar";
		  					$scope.Graficos.TipoEstado.Secciones[1] = "En Proceso";
		  					$scope.Graficos.TipoEstado.Secciones[2] = "Pendiente";
		  					$scope.Graficos.TipoEstado.Secciones[3] = "Completadas";

							$scope.Graficos.TipoEstado.Datos[0] = $scope.Estadisticas.SinIniciar;
							$scope.Graficos.TipoEstado.Datos[1] = $scope.Estadisticas.EnProceso;
							$scope.Graficos.TipoEstado.Datos[2] = $scope.Estadisticas.Pendientes;
							$scope.Graficos.TipoEstado.Datos[3] = $scope.Estadisticas.Completadas;

							if ( $scope.Estadisticas.TotalAsignadas > 0 ) {
								$scope.EstadisticasCargadas = true;
								$scope.EstadisticasEstadoCargadas = true;
							}
							else {
								$scope.EstadisticasCargadas = false;
								$scope.EstadisticasEstadoCargadas = false;
								$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";

							}
		  				})

		  				.error(function(error) {
		  					$scope.EstadisticasCargadas = false;
		  					$scope.EstadisticasEstadoCargadas = false;
							$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
						})
				}
				else {
					$scope.EstadisticasCargadas = false;
					$scope.EstadisticasEstadoCargadas = false;
					$scope.Error = "La primera fecha debe ser inferior a la segunda.";
				}
			}
			else {
				$scope.EstadisticasCargadas = false;
				$scope.EstadisticasEstadoCargadas = false;
				$scope.Error = "El rango de fecha es incorrecto.";
			}

  		};

  		$scope.getEstadisticaInstalacion = function() {

  			if ( $scope.Fechas.Inicio != null && $scope.Fechas.Fin != null ) {

  				delete $scope.Error;

  				if ( $scope.Fechas.Inicio < $scope.Fechas.Fin ) {

		  			SupervisorService.EstadisticasInstalacion($scope)

		  				.success(function(data) {

		  					$scope.Estadisticas = data.Estadisticas;

							$scope.Graficos.TipoIncidencia.Secciones[0] = "De Sistemas";
		  					$scope.Graficos.TipoIncidencia.Secciones[1] = "De Mantenimiento";

		  					$scope.Graficos.TipoEstado.Secciones[0] = "Sin Iniciar";
		  					$scope.Graficos.TipoEstado.Secciones[1] = "En Proceso";
		  					$scope.Graficos.TipoEstado.Secciones[2] = "Pendiente";
		  					$scope.Graficos.TipoEstado.Secciones[3] = "Completadas";

							$scope.Graficos.TipoIncidencia.Datos[0] = $scope.Estadisticas.DeSistemas;
							$scope.Graficos.TipoIncidencia.Datos[1] = $scope.Estadisticas.DeMantenimiento;

							$scope.Graficos.TipoEstado.Datos[0] = $scope.Estadisticas.SinIniciar;
							$scope.Graficos.TipoEstado.Datos[1] = $scope.Estadisticas.EnProceso;
							$scope.Graficos.TipoEstado.Datos[2] = $scope.Estadisticas.Pendientes;
							$scope.Graficos.TipoEstado.Datos[3] = $scope.Estadisticas.Completadas;

							if ( $scope.Estadisticas.Total > 0 ) {
								$scope.EstadisticasCargadas = true;
								$scope.EstadisticasTipoCargadas = true;
								$scope.EstadisticasEstadoCargadas = true;
							}
							else {
								$scope.EstadisticasCargadas = false;
								$scope.EstadisticasTipoCargadas = false;
								$scope.EstadisticasEstadoCargadas = false;
								$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
							}
		  				})

		  				.error(function(error) {
		  					$scope.EstadisticasCargadas = false;
							$scope.EstadisticasTipoCargadas = false;
							$scope.EstadisticasEstadoCargadas = false;
							$scope.Error = "No hay datos suficientes para crear el gráfico, es posible que no haya suficientes incidencias creadas en el rango de fecha introducido, pruebe con un rango de fecha más amplio.";
						})
				}
				else {
					$scope.EstadisticasCargadas = false;
					$scope.EstadisticasTipoCargadas = false;
					$scope.EstadisticasEstadoCargadas = false;
					$scope.Error = "La primera fecha debe ser inferior a la segunda.";
				}
			}
			else {
				$scope.EstadisticasCargadas = false;
				$scope.EstadisticasTipoCargadas = false;
				$scope.EstadisticasEstadoCargadas = false;				
				$scope.Error = "El rango de fecha es incorrecto.";
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
			$scope.EstadisticasTipoCargadas = false;
			$scope.EstadisticasComunCargadas = false;
			$scope.EstadisticasEstadoCargadas = false;		
			$scope.EstadisticasColaboradorCargadas = false;	
			delete $scope.Error;
		};

	});