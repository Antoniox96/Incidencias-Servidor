angular.module("AppIncidencias")

	.controller('ColaboradorController', function ($scope, $route, $routeParams, $http, $timeout, $uibModalInstance, IncidenciaID) {

		$scope.DepartamentoSeleccionado;
		$scope.UbicacionSeleccionada;
		$scope.InstalacionSeleccionada;
		$scope.Departamentos = [];
		$scope.TiposIncidencia = "";
		$scope.TipoSeleccionado;

		$scope.getDepartamentos = function() {
			$http.get('/Departamento')
				.success(function(data) {
					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.getTiposIncidencia = function() {
			$http.get('/TiposIncidencia')
				.success(function(data) {
					$scope.TiposIncidencia = data.Tipos;
					$scope.TipoSeleccionado = $scope.TiposIncidencia[0];
				})
				.error(function(error) {
					console.log(error);
				})
		};

		$scope.setUbicacion = function() {
			$scope.UbicacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id - 1].Ubicaciones[0];
			$scope.setInstalacion();
		};

		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada =$scope.UbicacionSeleccionada.Instalaciones[0];		
		};

		$scope.setDepartamento = function(InstalacionID) {
			$timeout(function() {
				for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
					for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
						for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
							if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == InstalacionID ) {
								$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
								$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n];
								$scope.InstalacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m];
							}
						}						
					}
				}
			}, 50 );
		}


		$scope.setTipoIncidencia = function(Tipo) {
			$timeout(function() {
					for ( var i = 0 ; i < $scope.TiposIncidencia.length ; i++ ) {
						if ( $scope.TiposIncidencia[i] == Tipo ) {
							$scope.TipoSeleccionado = $scope.TiposIncidencia[i];
						}
					}
			}, 50 );
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

		$scope.CrearIncidencia = function () {
			$http.post('/Incidencia', { 
								Titulo: $scope.Titulo, 
								Descripcion: $scope.Descripcion, 
								Tipo: $scope.TipoSeleccionado, 
								Instalacion: $scope.InstalacionSeleccionada.id
			       				})
				.success(function(data) {
					$route.reload();
			          })
			          .error(function(error) {
			          	$route.reload();
			          });

			$uibModalInstance.close();
		};

		$scope.EditarIncidencia = function () {
			$http.post('/Incidencia/' + IncidenciaID, { 
											Titulo: $scope.Titulo, 
											Descripcion: $scope.Descripcion, 
											Tipo: $scope.TipoSeleccionado, 
											Instalacion: $scope.InstalacionSeleccionada.id
									       })
				.success(function(data) {
					$route.reload();
			          })
			          .error(function(error) {
			          	$route.reload();
			          });

			$uibModalInstance.close();
		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});