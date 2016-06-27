angular.module("AppIncidencias")

	.controller('SupervisorController', function ($scope, $http, $route, $uibModalInstance, SupervisorService, IncidenciaID, DepartamentoID, UbicacionID, InstalacionID, UsuarioID) {

		$scope.cargarDatos = function() {

			SupervisorService.getDepartamentos()

				.success(function(data) {

					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];

					SupervisorService.getSupervisores()

						.success(function(data) {

							$scope.Supervisores = data.Supervisores;
							$scope.SupervisorSeleccionado = $scope.Supervisores[0];

							SupervisorService.getTiposOperador()

							.success(function(data) {

								$scope.tiposOperador = data.Tipos;
								$scope.tipoOperadorSeleccionado = $scope.tiposOperador[0];

								SupervisorService.getOperadores()

									.success(function(data) {

										$scope.Operadores = data.Operadores;
										$scope.Operadores.unshift({"Nombre": "Sin ", "Apellidos": "Asignar", "ID": 0});
										$scope.OperadorSeleccionado = $scope.Operadores[0];

										SupervisorService.getColaboradores()

										.success(function(data) {

											$scope.Colaboradores = data.Colaboradores;
											$scope.ColaboradorSeleccionado = $scope.Colaboradores[0];

											SupervisorService.getEstadosIncidencia()

												.success(function(data) {

													$scope.EstadosIncidencia = data.Estados;
													$scope.EstadoSeleccionado = $scope.EstadosIncidencia[0];

													SupervisorService.getPrioridadesIncidencia()

														.success(function(data) {

															$scope.PrioridadesIncidencia = data.Prioridades;
															$scope.PrioridadSeleccionada = $scope.PrioridadesIncidencia[0];

															SupervisorService.getTiposIncidencia()

																.success(function(data) {

																	$scope.TiposIncidencia = data.Tipos;
																	$scope.TipoSeleccionado = $scope.TiposIncidencia[0];

																	SupervisorService.getTiposGuardia()
																		.success(function(data) {

																			$scope.TiposGuardia = data.tiposGuardia;
																			$scope.TipoGuardiaSeleccionado = $scope.TiposGuardia[0];

																			if ( IncidenciaID != null ) {
																				SupervisorService.getIncidencia(IncidenciaID)

																					.success(function(data) {
																						$scope.Titulo = data.IncidenciaJSON.Titulo;
																						$scope.Descripcion = data.IncidenciaJSON.Descripcion;
																						$scope.Instalacion = data.IncidenciaJSON.Instalacion;
																						$scope.setDepartamento(data.IncidenciaJSON.Instalacion.ID);
																						$scope.setTipoIncidencia(data.IncidenciaJSON.Tipo);
																						$scope.setTipoGuardia(data.IncidenciaJSON.Guardia);
																						$scope.setPrioridadIncidencia(data.IncidenciaJSON.Prioridad);
																						$scope.setEstadoIncidencia(data.IncidenciaJSON.Estado);
																						$scope.setOperadorIncidencia(data.IncidenciaJSON.Operador);
																						$scope.Comentario = data.IncidenciaJSON.Comentario;
																						$scope.FechaInicio = new Date(data.IncidenciaJSON.FechaInicio);
																						$scope.FechaPrevista = new Date(data.IncidenciaJSON.FechaPrevista);
																						$scope.FechaFin = new Date(data.IncidenciaJSON.FechaFin);

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
						})

						.error(function(error) {
							console.log(error);
						})

				})

				.error(function(error) {
					console.log(error);
				})

		};

		$scope.getDatosZona = function() {
			SupervisorService.getDepartamentos()
				.success(function(data) {
				
				$scope.Departamentos = data.DepartamentosJSON;
				$scope.setDatosDepartamentoSeleccionado(DepartamentoID);

				if( UbicacionID != null ) {
					$scope.setDatosUbicacionSeleccionada(UbicacionID);
					$scope.DatosZonaCargado = true;

				}
				else if ( InstalacionID != null ) {
						$scope.setDatosInstalacionSeleccionada(InstalacionID);
						$scope.DatosZonaCargado = true;
				}
				else {
				$scope.DatosZonaCargado = true;
				}

				})

				.error(function(error) {
					console.log(error);
				})
			$scope.Departamento ={ Nombre: "" };	
			$scope.Ubicacion = { Nombre: "" };	
			$scope.Instalacion = { Nombre: ""};

		};

		$scope.getDatosUsuario = function() {
			$scope.Usuario ={ NickName: "", Password: "", Nombre: "", Apellidos: "", Rol: "", tipoOperador: "", Email: "" };
			SupervisorService.getUsuarios()
				.success(function(data) {

					$scope.Usuarios = data.Usuarios;
					$scope.setDatosUsuarioSeleccionado(UsuarioID);
					$scope.DatosUsuarioCargado = true;
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
		};


		$scope.setTipoIncidencia = function(Tipo) {
			for ( var i = 0 ; i < $scope.TiposIncidencia.length ; i++ ) {
				if ( $scope.TiposIncidencia[i] == Tipo ) {
					$scope.TipoSeleccionado = $scope.TiposIncidencia[i];
				}
			}
		};

		$scope.setTipoGuardia = function(Guardia) {
			for ( var i = 0 ; i < $scope.TiposGuardia.length ; i++ ) {
				if ( $scope.TiposGuardia[i] == Guardia ) {
					$scope.TipoGuardiaSeleccionado = $scope.TiposGuardia[i];
				}
			}
		};

		$scope.setPrioridadIncidencia = function(Prioridad) {
			for ( var i = 0 ; i < $scope.PrioridadesIncidencia.length ; i++ ) {
				if ( $scope.PrioridadesIncidencia[i] == Prioridad ) {
					$scope.PrioridadSeleccionada = $scope.PrioridadesIncidencia[i];
				}
			}
		};

		$scope.setEstadoIncidencia = function(Estado) {
			for ( var i = 0 ; i < $scope.EstadosIncidencia.length ; i++ ) {
				if ( $scope.EstadosIncidencia[i] == Estado ) {
					$scope.EstadoSeleccionado = $scope.EstadosIncidencia[i];
				}
			}
		}

		$scope.setOperadorIncidencia = function(Operador) {
			for ( var i = 0 ; i < $scope.Operadores.length ; i++ ) {
				if ( $scope.Operadores[i].ID == Operador.ID ) {
					$scope.OperadorSeleccionado = $scope.Operadores[i];
				}
			}
		}

		$scope.CrearIncidencia = function () {

			SupervisorService.CrearIncidencia($scope)

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

			SupervisorService.EditarIncidencia($scope, IncidenciaID)
			
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

		/*SET Administrador*/
		$scope.setDatosDepartamentoSeleccionado = function(DepartamentoID) {

			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				if ( $scope.Departamentos[i].id == DepartamentoID ) {
					$scope.Departamento.Nombre = $scope.Departamentos[i].Nombre;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
				}
			}

		};
		$scope.setDatosUbicacionSeleccionada = function(UbicacionID) {

			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					if ( $scope.Departamentos[i].Ubicaciones[n].id == UbicacionID ) {
						$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
						$scope.Ubicacion.Nombre = $scope.Departamentos[i].Ubicaciones[n].Nombre;
					}						
				}
			}

		};
		$scope.setDatosInstalacionSeleccionada = function(InstalacionID) {

			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == InstalacionID ) {
							$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
							$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n];
							$scope.Instalacion.Nombre = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].Nombre;
						}
					}						
				}
			}

		};

		$scope.setDatosUsuarioSeleccionado = function(UsuarioID) {
			for ( var i = 0 ; i < $scope.Usuarios.length ; i++ ) {
				if ( $scope.Usuarios[i].ID == UsuarioID ) {
					$scope.Usuario.NickName = $scope.Usuarios[i].NickName;
					$scope.Usuario.Nombre = $scope.Usuarios[i].Nombre;
					$scope.Usuario.Apellidos = $scope.Usuarios[i].Apellidos;
					$scope.Usuario.tipoOperador = $scope.Usuarios[i].tipoOperador;
					$scope.Usuario.Email = $scope.Usuarios[i].Email;
					$scope.Usuario.Rol = $scope.Usuarios[i].Rol;
				}
			}
		};

		/*EDITAR MODELOS*/
		$scope.EditarDepartamento = function () {
			SupervisorService.EditarDepartamento($scope, DepartamentoID)

				.success(function(data) {
					console.log(data);
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};

		$scope.EditarInstalacion = function () {
			SupervisorService.EditarInstalacion($scope, InstalacionID)

				.success(function(data) {
					console.log(data);
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};

		$scope.EditarSupervisor = function () {
			SupervisorService.EditarSupervisor($scope, UsuarioID)

				.success(function(data) {
					console.log(data);
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};
		$scope.EditarOperador = function () {
			SupervisorService.EditarOperador($scope, UsuarioID)

				.success(function(data) {
					console.log(data);
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};
		$scope.EditarColaborador = function () {
			SupervisorService.EditarColaborador($scope, UsuarioID)

				.success(function(data) {
					console.log(data);
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};

		$scope.ActualizarPassword = function () {
			SupervisorService.ActualizarPassword($scope, UsuarioID)

				.success(function(data) {
					console.log(data);
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};
	});