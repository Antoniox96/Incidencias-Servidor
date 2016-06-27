angular.module("AppIncidencias")

	.controller('OperadorController', function ($scope, $route, $routeParams, $http, $timeout, $uibModalInstance, IncidenciaID, OperadorService) {

		$scope.cargarDatos = function() {

			OperadorService.getEstadosIncidencia()

				.success(function(data) {
					$scope.EstadosIncidencia = data.Estados;
				})

				.error(function(error) {
					console.log(error);
				})

		};

		$scope.cargarComentario = function() {
 
 			OperadorService.getComentarioIncidencia($scope, IncidenciaID)
 
 				.success(function(data) {
 					$scope.Comentario = data.Comentario;
 
 					$scope.ComentarioCargado = true;
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

		$scope.EditarIncidencia = function (Estado) {

			$scope.setEstadoIncidencia(Estado);
			
			if ( $scope.EstadoSeleccionado != null ) {

				OperadorService.EditarIncidencia($scope, IncidenciaID)

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