angular.module("AppIncidencias")

	.controller('OperadorController', function ($scope, $route, $routeParams, $http, $timeout, $uibModalInstance, IncidenciaID) {

		$scope.EstadosIncidencia;
		$scope.EstadoSeleccionado;

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

		$scope.getIncidencia = function () {
			$http.get('/Incidencia/' + IncidenciaID)
				.success(function(data) {
					$scope.Titulo = data.Titulo;
					$scope.Descripcion = data.Descripcion;
					$scope.Instalacion = data.Instalacion;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.setDepartamento(data.Instalacion.id);
					$scope.setTipoIncidencia(data.Tipo);
				})
				.error(function(error) {
					console.log(error);
				});
		};

		$scope.EditarIncidencia = function (Estado) {
			$scope.setEstadoIncidencia(Estado);
			
			if ( $scope.EstadoSeleccionado != null ) {
				$http.post('/Incidencia/' + IncidenciaID, { Estado: $scope.EstadoSeleccionado })
					.success(function(data) {
						$route.reload();
				          })
				          .error(function(error) {
				          	$route.reload();
				          });
			}
		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});