angular.module("AppIncidencias")

	.controller('EstadisticasController', function ($scope, $http, SupervisorService) {

		$scope.TiposGrafico = [ { Nombre: "Queso", Value: "Pie" }, { Nombre: "Dónut", Value: "Doughnut" } ];
		$scope.TipoGrafico = {};
		$scope.TipoGrafico.Seleccionado = $scope.TiposGrafico[0];

		$scope.Secciones = [];
  		$scope.Datos = [];
  		$scope.Fechas = {};

  		$scope.cargarDatos = function() {

  			SupervisorService.getColaboradores()

						.success(function(data) {

							$scope.Colaboradores = data.Colaboradores;
							$scope.ColaboradorSeleccionado = $scope.Colaboradores[0];

							SupervisorService.getOperadores()

								.success(function(data) {

									$scope.Operadores = data.Operadores;
									$scope.OperadorSeleccionado = $scope.Operadores[0];

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

  			SupervisorService.EstadisticasColaborador($scope)

  				.success(function(data) {
  					$scope.Estadisticas = data.Estadisticas;
  					$scope.Secciones[0] = "Incidencias Creadas por Otros";
  					$scope.Secciones[1] = "Incidencias Creadas por " + $scope.ColaboradorSeleccionado.Nombre;
					$scope.Datos[0] = parseInt($scope.Estadisticas.TotalTodos, 10);
					$scope.Datos[1] = parseInt($scope.Estadisticas.TotalColaborador, 10);

					$scope.EstadisticasCargadas = true;
  				})

  				.error(function(error) {
					console.log(error);
				})

  		};

	});