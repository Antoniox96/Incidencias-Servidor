angular.module("AppIncidencias")

	.factory('ColaboradorService', function($http) {
		return {

			getDepartamentos: function() {
				return $http.get('/Departamento');
			},

			getTiposIncidencia: function() {
				return $http.get('/TiposIncidencia');
			},

			getIncidencia: function(IncidenciaID) {
				return $http.get('/Incidencia/' + IncidenciaID);
			},

			CrearIncidencia: function($scope) {
				return $http.post('/Incidencia', { 
								Tipo: $scope.TipoSeleccionado,
								Empleado: $scope.Empleado,
								Titulo: $scope.Titulo, 
								Descripcion: $scope.Descripcion,  
								Instalacion: $scope.InstalacionSeleccionada.id
			       				})
			},

			EditarIncidencia: function($scope, IncidenciaID) {
				return $http.post('/Incidencia/' + IncidenciaID, { 
								Tipo: $scope.TipoSeleccionado,
								Empleado: $scope.Empleado,
								Titulo: $scope.Titulo, 
								Descripcion: $scope.Descripcion,  
								Instalacion: $scope.InstalacionSeleccionada.id
			       				})
			}

		}

	});