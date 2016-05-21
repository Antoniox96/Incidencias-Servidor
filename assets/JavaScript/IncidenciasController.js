angular.module("AppIncidencias")
	.controller("IncidenciasController", ["$scope", "$http", function($A, $B) {
		$A.Incidencias = [];		
		if ( $A.Incidencias.length == 0 ) {
			$B.get("/Incidencia")
				.success(function (data) {
					$A.Incidencias = data;
				})
				.error(function (error) {
					$A.Error = error;
				});
		}
	}]);