angular.module("AppIncidencias")

	.factory('OperadorService', function($http) {
		return {

			getEstadosIncidencia: function() {
				return $http.get('/EstadosIncidencia');
			},

			getComentarioIncidencia: function($scope, IncidenciaID) {
 				return $http.get('/Incidencia/' + IncidenciaID);
 			},

			EditarIncidencia: function($scope, IncidenciaID) {
				return $http.post('/Incidencia/' + IncidenciaID, { Estado: $scope.EstadoSeleccionado, Comentario: $scope.Comentario });
			}

		}

	});