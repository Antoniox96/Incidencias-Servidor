angular.module("AppIncidencias")

	.factory('OperadorService', function($http) {
		return {

			getEstadosIncidencia: function() {
				return $http.get('/EstadosIncidencia');
			},

			EditarIncidencia: function($scope, IncidenciaID) {
				return $http.post('/Incidencia/' + IncidenciaID, { Estado: $scope.EstadoSeleccionado });
			}

		}

	});