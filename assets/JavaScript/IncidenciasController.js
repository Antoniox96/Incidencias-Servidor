angular.module("AppIncidencias")
	.controller("IncidenciasController", ["$scope", "$http", function($A, $B) {
		$A.Incidencias = [];
		$A.Loading = true;
		
		if ( $A.Incidencias.length == 0 ) {
			$B.get("/Incidencia")
				.success(function (data) {
					$A.Incidencias = data;
					$A.Loading = false;
				})
				.error(function (error) {
					console.log(error);
					$A.Loading = false;
				});
		}
	}]);