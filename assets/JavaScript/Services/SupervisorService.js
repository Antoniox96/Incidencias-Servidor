angular.module("AppIncidencias")

	.factory('SupervisorService', function($http) {
		return {

			getDepartamentos: function() {
				return $http.get('/Departamento');
			},

			getUsuarios: function() {
				return $http.get('/Usuarios');
			},

			getSupervisores: function() {
				return $http.get('/Supervisores');
			},

			getOperadores: function() {
				return $http.get('/Operadores');
			},

			getColaboradores: function() {
				return $http.get('/Colaboradores');
			},

			getEstadosIncidencia: function() {
				return $http.get('/EstadosIncidencia');
			},

			getPrioridadesIncidencia: function() {
				return $http.get('/PrioridadesIncidencia');
			},

			getTiposGuardia: function() {
				return $http.get('/TiposGuardia');
			},

			getTiposIncidencia: function() {
				return $http.get('/TiposIncidencia');
			},

			getTiposOperador: function() {
				return $http.get('/TiposOperador');
			},

			getIncidencia: function(IncidenciaID) {
				return $http.get('/Incidencia/' + IncidenciaID);
			},

			CrearIncidencia: function($scope) {
				return $http.post('/Incidencia', { 
								Titulo: $scope.Titulo, 
						    		Descripcion: $scope.Descripcion, 
					    			Departamento: $scope.DepartamentoSeleccionado, 
					    			Ubicacion: $scope.UbicacionSeleccionada, 
					    			Instalacion: $scope.InstalacionSeleccionada, 
					    			Tipo: $scope.TipoSeleccionado, 
					    			Prioridad: $scope.PrioridadSeleccionada, 
					    			Guardia: $scope.TipoGuardiaSeleccionado,
					    			Estado: $scope.EstadoSeleccionado, 
					    			Operador: $scope.OperadorSeleccionado.ID, 
					    			Comentario: $scope.Comentario,
					    			FechaInicio: $scope.FechaInicio, 
					    			FechaPrevista: $scope.FechaPrevista, 
					    			FechaFin: $scope.FechaFin
    							});
			},

			EditarIncidencia: function($scope, IncidenciaID) {
				return $http.post('/Incidencia/' + IncidenciaID, { 
								Titulo: $scope.Titulo, 
						    		Descripcion: $scope.Descripcion, 
					    			Instalacion: $scope.InstalacionSeleccionada.id, 
					    			Tipo: $scope.TipoSeleccionado, 
					    			Prioridad: $scope.PrioridadSeleccionada, 
					    			Guardia: $scope.TipoGuardiaSeleccionado,
					    			Estado: $scope.EstadoSeleccionado, 
					    			Operador: $scope.OperadorSeleccionado.ID, 
					    			Comentario: $scope.Comentario,
					    			FechaInicio: $scope.FechaInicio, 
					    			FechaPrevista: $scope.FechaPrevista, 
					    			FechaFin: $scope.FechaFin
					    		});
			},

			EstadisticasGlobales: function($scope) {
				return $http.post('/Estadistica');
			},

			EstadisticasColaborador: function($scope) {
				return $http.post('/EstadisticaColaborador', { 
								FechaInicio: $scope.Fechas.Inicio, 
						    		FechaFin: $scope.Fechas.Fin, 
					    			Colaborador: $scope.Colaborador.Seleccionado.ID
					    		});
			},

			EstadisticasOperador: function($scope) {
				return $http.post('/EstadisticaOperador', { 
								FechaInicio: $scope.Fechas.Inicio, 
						    		FechaFin: $scope.Fechas.Fin, 
					    			Operador: $scope.Operador.Seleccionado.ID
					    		});
			},

			EstadisticasInstalacion: function($scope) {
				return $http.post('/EstadisticaInstalacion', { 
								FechaInicio: $scope.Fechas.Inicio, 
						    		FechaFin: $scope.Fechas.Fin, 
					    			Instalacion: $scope.Instalacion.Seleccionada.id
					    		});
			},
			/*ADMIN*/
			EditarDepartamento: function($scope, DepartamentoID) {
				return $http.post('/Departamento/' + DepartamentoID, { 
								Nombre: $scope.Departamento.Nombre, 
					    		});
			},
			EditarUbicacion: function($scope, UbicacionID) {
				return $http.post('/Ubicacion/' + UbicacionID, { 
								Nombre: $scope.Ubicacion.Nombre, 
								Departamento: $scope.DepartamentoSeleccionado.id
					    		});
			},	
			EditarInstalacion: function($scope, InstalacionID) {
				return $http.post('/Instalacion/' + InstalacionID, { 
								Nombre: $scope.Instalacion.Nombre, 
								Ubicacion: $scope.UbicacionSeleccionada.id
					    		});
			}, 

			EditarSupervisor: function($scope, UsuarioID) {
					return $http.post('/Usuario/' + UsuarioID, { 
								NickName: $scope.Usuario.NickName,
								Nombre: $scope.Usuario.Nombre, 
								Apellidos: $scope.Usuario.Apellidos,
								Email: $scope.Usuario.Email
					    		});
				
			},
			EditarOperador: function($scope, UsuarioID) {
					return $http.post('/Usuario/' + UsuarioID, { 
								NickName: $scope.Usuario.NickName,
								Nombre: $scope.Usuario.Nombre, 
								Apellidos: $scope.Usuario.Apellidos,
								tipoOperador: $scope.tipoOperadorSeleccionado,
								Email: $scope.Usuario.Email
					    		});
				
			},
			EditarColaborador: function($scope, UsuarioID) {
					return $http.post('/Usuario/' + UsuarioID, { 
								NickName: $scope.Usuario.NickName,
								Nombre: $scope.Usuario.Nombre, 
								Apellidos: $scope.Usuario.Apellidos,
								Email: $scope.Usuario.Email
					    		});
				
			},
			ActualizarPassword: function($scope, UsuarioID) {
					return $http.post('/Usuario/' + UsuarioID, { 
								Password: $scope.Usuario.Password
					    		});
			}

		}

	});