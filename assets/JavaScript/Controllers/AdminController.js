angular.module("AppIncidencias")

	.controller('AdminController', function ($scope, $filter, $http, $route, $timeout, $rootScope, $window, $uibModal, SupervisorService) {

		$scope.cargarDatos = function() {
			$scope.editarUbicacion = { Departamento: "" };
			$scope.editarInstalacion = { Departamento: "", Ubicacion: "" };
			SupervisorService.getDepartamentos()

				.success(function(data) {

					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = "";
					$scope.UbicacionSeleccionada = "";
					$scope.InstalacionSeleccionada = "";

					/*para admin editar.html*/
					$scope.editarUbicacion.Departamento = $scope.Departamentos[0];

					$scope.editarInstalacion.Departamento = $scope.Departamentos[0];
					$scope.editarInstalacion.Ubicacion = $scope.Departamentos[$scope.editarInstalacion.Departamento.id - 1].Ubicaciones[0];

					SupervisorService.getSupervisores()

						.success(function(data) {

							$scope.Supervisores = data.Supervisores;
							$scope.SupervisorSeleccionado = "";

							SupervisorService.getTiposOperador()

							.success(function(data) {

								$scope.tiposOperador = data.Tipos;
								$scope.tipoOperadorSeleccionado = "";

								SupervisorService.getOperadores()

								.success(function(data) {

									$scope.Operadores = data.Operadores;
									$scope.OperadorSeleccionado = "";
									
									SupervisorService.getColaboradores()

									.success(function(data) {

										$scope.Colaboradores = data.Colaboradores;
										$scope.ColaboradorSeleccionado = "";
										$scope.DatosCargados = true;

									})

									.error(function(error) {
										console.log(error);
									})
									

								})

								.error(function(error) {
									console.log(error);
								})

							})
							.error(function(error) {
								console.log(error);
							})	

						})

						.error(function(error) {
							console.log(error);
						})

				})

				.error(function(error) {
					console.log(error);
				})

		};
		$scope.getDatosParaAdmin = function() {
			SupervisorService.getDepartamentos()
				.success(function(data) {
				
					$scope.Departamentos = data.DepartamentosJSON;

					/*para admin crear.html*/
					$scope.newUbicacion.Departamento = $scope.Departamentos[0];

					$scope.newInstalacion.Departamento = $scope.Departamentos[0];
					$scope.newInstalacion.Ubicacion = $scope.Departamentos[$scope.newInstalacion.Departamento.id - 1].Ubicaciones[0];

					/*para admin eliminar.html*/
					$scope.deleteUbicacion.Departamento = $scope.Departamentos[0];

					$scope.deleteInstalacion.Departamento = $scope.Departamentos[0];
					$scope.deleteInstalacion.Ubicacion = $scope.Departamentos[$scope.deleteInstalacion.Departamento.id - 1].Ubicaciones[0];

					SupervisorService.getSupervisores()

						.success(function(data) {

							$scope.Supervisores = data.Supervisores;
							$scope.SupervisorSeleccionado = $scope.Supervisores[0];

							SupervisorService.getTiposOperador()

							.success(function(data) {

								$scope.tiposOperador = data.Tipos;
								$scope.tipoOperadorSeleccionado = $scope.tiposOperador[0];

								$scope.newOperador.tipoOperador = $scope.tiposOperador[0];

								SupervisorService.getOperadores()

								.success(function(data) {

									$scope.Operadores = data.Operadores;
									$scope.OperadorSeleccionado = "";
									
									SupervisorService.getColaboradores()

									.success(function(data) {

										$scope.Colaboradores = data.Colaboradores;
										$scope.ColaboradorSeleccionado = "";
										$scope.DatosCargados = true;

									})

									.error(function(error) {
										console.log(error);
									})
									

								})

								.error(function(error) {
									console.log(error);
								})

							})
							.error(function(error) {
								console.log(error);
							})	

						})

						.error(function(error) {
							console.log(error);
						})

				})

				.error(function(error) {
					console.log(error);
				})

		};

		$scope.setUbicacionAdminCrear = function() {
			$scope.newInstalacion.Ubicacion = $scope.Departamentos[$scope.newInstalacion.Departamento.id - 1].Ubicaciones[0];
		};
		$scope.setUbicacionAdminEditar = function() {
			$scope.editarInstalacion.Ubicacion = $scope.Departamentos[$scope.editarInstalacion.Departamento.id - 1].Ubicaciones[0];
		};
		$scope.setUbicacionAdminEliminar = function() {
			$scope.deleteInstalacion.Ubicacion = $scope.Departamentos[$scope.deleteInstalacion.Departamento.id - 1].Ubicaciones[0];
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
		};


		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

		/*SET ADMIN*/
		$scope.setDepartamentoSeleccionado = function(Departamento) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				if ( $scope.Departamentos[i].id == Departamento ) {
					$scope.DepartamentoSeleccionado = $scope.Departamentos[i].id;
				}
			}
			
		};
		$scope.setUbicacionSeleccionada = function(Ubicacion) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					if ( $scope.Departamentos[i].Ubicaciones[n].id == Ubicacion ) {
						$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].id
					}						
				}
			}
			
		};
		$scope.setInstalacionSeleccionada = function(Instalacion) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == Instalacion ) {
							$scope.InstalacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id;
						}
					}						
				}
			}

		};

		$scope.setSupervisorSeleccionado = function(Supervisor) {
				if($scope.Supervisores.length == 1) {
					$scope.SupervisorSeleccionado = $scope.Supervisores[0].ID;
				}
				else {	
					for ( var i = 0 ; i < $scope.Supervisores.length ; i++ ) {
						if ( $scope.Supervisores[i].ID == Supervisor ) {
							$scope.SupervisorSeleccionado = $scope.Supervisores[i].ID;
							if( $scope.Nombre != $scope.Supervisores[i].Nombre ){
								$scope.Restriccion = true; /* Si es true no puede eliminar al supervisor selecccionado porque es el mismo*/
							}
							else {
								$scope.Restriccion = false;
							}
						}
					}
				}
		};
		$scope.setOperadorSeleccionado = function(Operador) {
			for ( var i = 0 ; i < $scope.Operadores.length ; i++ ) {
				if ( $scope.Operadores[i].ID == Operador ) {
					$scope.OperadorSeleccionado = $scope.Operadores[i].ID;
				}
			}
		};
		$scope.setColaboradorSeleccionado = function(Colaborador) {
			for ( var i = 0 ; i < $scope.Colaboradores.length ; i++ ) {
				if ( $scope.Colaboradores[i].ID == Colaborador ) {
					$scope.ColaboradorSeleccionado = $scope.Colaboradores[i].ID;
				}
			}
		};

		/*ADMIN*/
		$scope.newDepartamento={ Nombre: "" };	
		$scope.newUbicacion={ Nombre: "", Departamento: "" };
		$scope.newInstalacion={ Nombre: "", Ubicacion: "", Departamento: "" };

		$scope.newSupervisor={ NickName: "", Password: "", Nombre: "", Apellidos: "", Email: "" };
		$scope.newOperador={ NickName: "", Password: "", tipoOperador: "", Nombre: "", Apellidos: "", Email: "" };
		$scope.newColaborador={ NickName: "", Password: "", Nombre: "", Apellidos: "", Email: "" };

		$scope.deleteUbicacion = { Departamento: "" };
		$scope.deleteInstalacion = { Departamento: "", Ubicacion: "" };

		$scope.CrearDepartamento = function () {

			if ( $rootScope.Rol == '1' ) {
				$http.post('/Departamento', { 
								Nombre: $scope.newDepartamento.Nombre,
								Ubicaciones: []
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}

		};
		$scope.EditarDepartamento = function () {
			if ( $scope.DepartamentoSeleccionado != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Departamento.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: $scope.DepartamentoSeleccionado,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: null,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};
		$scope.EliminarDepartamento = function () {
			if( $scope.DepartamentoSeleccionado != null && $rootScope.Rol == '1' ) {
				$http.delete('/Departamento/' + $scope.DepartamentoSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};

		$scope.CrearUbicacion = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Ubicacion', { 
								Nombre: $scope.newUbicacion.Nombre,
								Departamento: $scope.newUbicacion.Departamento.id,
								Instalaciones: []
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarUbicacion = function () {
			if ( $scope.UbicacionSeleccionada != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Ubicacion.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: $scope.UbicacionSeleccionada,
						InstalacionID: null,
						UsuarioID: null,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};
		$scope.EliminarUbicacion = function () {
			if( $scope.UbicacionSeleccionada != null && $rootScope.Rol == '1' ) {
				$http.delete('/Ubicacion/' + $scope.UbicacionSeleccionada)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};

		$scope.CrearInstalacion = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Instalacion', { 
								Nombre: $scope.newInstalacion.Nombre,
								Ubicacion: $scope.newInstalacion.Ubicacion.id,
								Incidencias: []
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarInstalacion = function () {
			if ( $scope.InstalacionSeleccionada != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Instalacion.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: $scope.InstalacionSeleccionada,
						UsuarioID: null,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};
		$scope.EliminarInstalacion = function () {
			if( $scope.InstalacionSeleccionada != null && $rootScope.Rol == '1' ) {
				$http.delete('/Instalacion/' + $scope.InstalacionSeleccionada)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};


		/*USUARIOS*/
		$scope.CrearSupervisor = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Usuario', { 
								NickName: $scope.newSupervisor.NickName,
								Password: $scope.newSupervisor.Password,
								Rol: 1,
								Nombre: $scope.newSupervisor.Nombre,
								Apellidos: $scope.newSupervisor.Apellidos,
								Email: $scope.newSupervisor.Email
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarSupervisor = function () {
			if ( $scope.SupervisorSeleccionado != null && $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Usuario.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.SupervisorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Supervisor.');
			}
		};
		$scope.ActualizarPasswordSupervisor = function () {
			if ( $scope.SupervisorSeleccionado != null && $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Password.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.SupervisorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Supervisor.');
			}
		};
		$scope.BorrarSupervisor = function () {
			if( $scope.SupervisorSeleccionado != null && $rootScope.Rol == '1' ) {
				$http.delete('/Usuario/' + $scope.SupervisorSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Supervisor.');
			}

		};

		$scope.CrearOperador = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Usuario', { 
								NickName: $scope.newOperador.NickName,
								Password: $scope.newOperador.Password,
								Rol: 2,
								tipoOperador: $scope.newOperador.tipoOperador,
								Nombre: $scope.newOperador.Nombre,
								Apellidos: $scope.newOperador.Apellidos,
								Email: $scope.newOperador.Email
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarOperador = function () {
			if ( $scope.OperadorSeleccionado != null && $rootScope.Rol == '1' ) {
				$uibModal.open({
						templateUrl: "Vistas/Formularios/Supervisor/Editar Usuario.html",
						controller: 'SupervisorController',
						scope: $scope,
						size: 'md',
						resolve: {
							DepartamentoID: null,
							UbicacionID: null,
							InstalacionID: null,
							UsuarioID: $scope.OperadorSeleccionado,
							IncidenciaID: null
						}
					});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Operador.');
			}
		};
		$scope.ActualizarPasswordOperador = function () {
			if ( $scope.OperadorSeleccionado != null && $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Password.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.OperadorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Supervisor.');
			}
		};
		$scope.BorrarOperador = function () {
			if( $scope.OperadorSeleccionado != null && $rootScope.Rol == '1' ) {
				$http.delete('/Usuario/' + $scope.OperadorSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Operador.');
			}
		};

		$scope.CrearColaborador = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Usuario', { 
								NickName: $scope.newColaborador.NickName,
								Password: $scope.newColaborador.Password,
								Rol: 3,
								Nombre: $scope.newColaborador.Nombre,
								Apellidos: $scope.newColaborador.Apellidos,
								Email: $scope.newColaborador.Email
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarColaborador = function () {
			if ( $scope.ColaboradorSeleccionado != null && $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Usuario.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.ColaboradorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};
		$scope.ActualizarPasswordColaborador = function () {
			if ( $scope.ColaboradorSeleccionado != null && $rootScope.Rol == '1' ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Password.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'md',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.ColaboradorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Supervisor.');
			}
		};
		$scope.BorrarColaborador = function () {
			if( $scope.ColaboradorSeleccionado != null && $rootScope.Rol == '1' ) {
				$http.delete('/Usuario/' + $scope.ColaboradorSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};


	});