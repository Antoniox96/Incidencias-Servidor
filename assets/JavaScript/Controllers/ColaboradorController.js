angular.module("AppIncidencias")

	.controller('ColaboradorController', function ($scope, $http, $route, $uibModalInstance, ColaboradorService, IncidenciaID) {

		$scope.cargarDatos = function() {

			ColaboradorService.getDepartamentos()

				.success(function(data) {

					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];

					ColaboradorService.getTiposIncidencia()

						.success(function(data) {

							$scope.TiposIncidencia = data.Tipos;
							$scope.TipoSeleccionado = $scope.TiposIncidencia[0];

							if ( IncidenciaID != null ) {
								ColaboradorService.getIncidencia(IncidenciaID)

									.success(function(data) {
										$scope.Titulo = data.Titulo;
										$scope.Descripcion = data.Descripcion;
										$scope.Instalacion = data.Instalacion;
										$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
										$scope.setDepartamento(data.Instalacion.id);
										$scope.setTipoIncidencia(data.Tipo);

										$scope.DatosCargados = true;
									})
									.error(function(error) {
										console.log(error);
									});	
							}
							else {
								$scope.DatosCargados = true;
							}							

						})

						.error(function(error) {
							console.log(error);
						})

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
		}


		$scope.setTipoIncidencia = function(Tipo) {
			for ( var i = 0 ; i < $scope.TiposIncidencia.length ; i++ ) {
				if ( $scope.TiposIncidencia[i] == Tipo ) {
					$scope.TipoSeleccionado = $scope.TiposIncidencia[i];
				}
			}
		}

		$scope.CrearIncidencia = function () {

			ColaboradorService.CrearIncidencia($scope)

				.success(function(data) {
					$uibModalInstance.close();
					$route.reload();
			          })

			          .error(function(error) {
					$uibModalInstance.close();
			          	$route.reload();
			          });

		};

		$scope.EditarIncidencia = function () {

			ColaboradorService.EditarIncidencia($scope, IncidenciaID)

				.success(function(data) {
					$uibModalInstance.close();
					$route.reload();
			          })

			          .error(function(error) {
					$uibModalInstance.close();
			          	$route.reload();
			          });

		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});