var moment = require('moment');

module.exports = {

	find: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Incidencia.find().populateAll()

				.then(function(Incidencias) {
					
					var IncidenciasJSON = [];
					var Ubicaciones = [];
					var FindUbicacion;
					var Departamentos = [];

					if (Incidencias) {

						Incidencias.forEach(function(Incidencia) {
							
							var Operador = "Sin Asignar";

							if ( Incidencia.Operador != null ) {
								Operador = Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos;
							}

							IncidenciaJSON = { 
								"id": 			Incidencia.id,
								"Tipo": 		Incidencia.Tipo,
								"Titulo": 		Incidencia.Titulo, 
								"Descripcion": 	Incidencia.Descripcion, 
								"Departamento": "",
								"Ubicacion": 	"", 
								"Instalacion": 	Incidencia.Instalacion.Nombre, 
								"Operador": 	Operador,
								"Empleado": 	Incidencia.Empleado,
								"Estado": 		Incidencia.Estado,
								"Prioridad": 	Incidencia.Prioridad,
								"Guardia": 		Incidencia.Guardia,
								"Comun": 		Incidencia.Comun,
								"Comentario": 	Incidencia.Comentario,
								"FechaCreacion": Incidencia.createdAt,
								"FechaInicio": 	Incidencia.FechaInicio,
								"FechaPrevista": 	Incidencia.FechaPrevista,
								"FechaFin": 	Incidencia.FechaFin
							}

							FindUbicacion = Ubicacion.findOne(Incidencia.Instalacion.Ubicacion).populateAll()
								
								.then(function(Ubicacion) {
									return (Ubicaciones.push(Ubicacion.Nombre),Departamentos.push(Ubicacion.Departamento.Nombre) );

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];
					}
					else { 
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Ubicacion = Ubicaciones[index];
						IncidenciaJSON.Departamento = Departamentos[index];
					})
					return res.json(200, { IncidenciasJSON });
				})

				.catch(function(error) { next(error); });

		}

		else if ( req.Rol == '2' ) {

			Incidencia.find().where({ or: [ { "Operador": req.Usuario.id }, { "Comun": "Sí" }] }).populateAll()

				.then(function(Incidencias) {

					var IncidenciasFiltro = [];
					
					var IncidenciasJSON = [];
					var Ubicaciones = [];
					var FindUbicacion;
					var Departamentos = [];

					if (Incidencias) {

						Incidencias.forEach(function(Inc){

							if( Inc.Tipo == req.tipoOperador ) {

								IncidenciasFiltro.push(Inc);

							}

						});

						IncidenciasFiltro.forEach(function(Incidencia) {

							var Operador = 0;

							if ( Incidencia.Operador != null ) {
								Operador = Incidencia.Operador.id;
							}

							IncidenciaJSON = {
								"id": 			Incidencia.id,
								"Titulo": 		Incidencia.Titulo, 
								"Descripcion": 	Incidencia.Descripcion, 
								"Departamento": "", 
								"Ubicacion": 	"",
								"Instalacion": 	Incidencia.Instalacion.Nombre,
								"Tipo": 		Incidencia.Tipo, 
								"Empleado": 	Incidencia.Empleado,
								"Operador": 	Operador,
								"Estado": 		Incidencia.Estado,
								"Prioridad": 	Incidencia.Prioridad,
								"Comun": 		Incidencia.Comun,
								"Comentario": 	Incidencia.Comentario,
								"FechaPrevista": 	Incidencia.FechaPrevista
							}

							FindUbicacion = Ubicacion.findOne(Incidencia.Instalacion.Ubicacion).populateAll()

								.then(function(Ubicacion) {

									return ( Ubicaciones.push(Ubicacion.Nombre),Departamentos.push(Ubicacion.Departamento.Nombre) );

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index];
						IncidenciaJSON.Ubicacion = Ubicaciones[index];
					})
					return res.json(200, { IncidenciasJSON });
				})

				.catch(function(error) { next(error); });

		}

		else if ( req.Rol == '3' ) {

			Incidencia.find().where({"Propietario": req.Usuario.id }).populateAll()

				.then(function(Incidencias) {
					
					var IncidenciasJSON = [];
					var Ubicaciones = [];
					var FindUbicacion;
					var Departamentos = [];

					if (Incidencias) {

						Incidencias.forEach(function(Incidencia) {
							var Operador = "Sin Asignar";

							if ( Incidencia.Operador != null ) {
								Operador = Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos;
							}

							IncidenciaJSON = {
								"id": 			Incidencia.id,
								"Tipo": 		Incidencia.Tipo,
								"Empleado": 	Incidencia.Empleado, 
								"Titulo": 		Incidencia.Titulo, 
								"Descripcion": 	Incidencia.Descripcion, 
								"Departamento": "", 
								"Ubicacion": 	"",
								"Instalacion": 	Incidencia.Instalacion.Nombre,
								"Operador": 	Operador,
								"Estado": 		Incidencia.Estado,
								"Comun": 		Incidencia.Comun,
								"FechaCreacion": Incidencia.createdAt
							}
							
							FindUbicacion = Ubicacion.findOne(Incidencia.Instalacion.Ubicacion).populateAll()

								.then(function(Ubicacion) {

									return ( Ubicaciones.push(Ubicacion.Nombre),Departamentos.push(Ubicacion.Departamento.Nombre) );

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindUbicacion, Ubicaciones, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index];
						IncidenciaJSON.Ubicacion = Ubicaciones[index];
					})
					return res.json(200, { IncidenciasJSON });
				})

				.catch(function(error) { next(error); });
		}

	},

	create: function (req, res) {

		if ( req.Rol == '1' ) {

			var Operador = "Sin Asignar";

			if ( req.body.Operador != null ) {
				Operador = req.body.Operador;
			}

			Incidencia.create({
							Tipo: req.body.Tipo,
							Empleado: 	req.body.Empleado,
							Titulo: req.body.Titulo,
							Descripcion: req.body.Descripcion,
							Estado: req.body.Estado,
							Prioridad: req.body.Prioridad,
							Guardia: req.body.Guardia,
							Comun: req.body.Comun,
							FechaInicio: req.body.FechaInicio,
							FechaPrevista: req.body.FechaPrevista,
							FechaFin: req.body.FechaFin,
							Instalacion: req.body.Instalacion,
							Comentario: req.body.Comentario,
							Operador: Operador,
							Propietario: req.Usuario
						}
			).exec(function (err, Incidencia) {

				if (err) {
					return res.json(err.status, {err: err});
				}

				if (Incidencia) {
					res.json(200, { msg: 'Incidencia creada satisfactoriamente.' });
				}
			
			});

		}

		else if ( req.Rol == '3' ) {

			var Operador = "Sin asignar";
			Incidencia.create({
							Tipo: req.body.Tipo,
							Empleado: 	req.body.Empleado,
							Titulo: req.body.Titulo,
							Descripcion: req.body.Descripcion,
							Instalacion: req.body.Instalacion,
							Operador: Operador,
							Propietario: req.Usuario
						}
			).exec(function (err, Incidencia) {

				if (err) {
					return res.json(404, {err: err});
				}

				if (Incidencia) {
					res.json(200, { msg: 'Incidencia creada satisfactoriamente.' });
				}
			
			});

		}

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	findOne: function (req, res, next) {

		if ( req.Rol == '1') {

			Incidencia.findOne(req.params.id).populateAll()
				.then(function(Incidencia){

					if (Incidencia) {

						var Operador = "Sin Asignar";

						if ( Incidencia.Operador != null ) {
							Operador = { ID: Incidencia.Operador.id , Nombre: Incidencia.Operador.Nombre, Apellidos: Incidencia.Operador.Apellidos };
						}

						var Propietario = "Usuario Eliminado";

						if ( Incidencia.Propietario != null ) {
							Propietario = Incidencia.Propietario.Nombre + " " + Incidencia.Propietario.Apellidos;
						}

						var IncidenciaJSON = {
							"ID": 				Incidencia.id,
							"Tipo": 			Incidencia.Tipo, 
							"Empleado": 		Incidencia.Empleado,
							"Titulo":      		Incidencia.Titulo, 
							"Descripcion": 		Incidencia.Descripcion, 
							"Instalacion": 		{ "ID": Incidencia.Instalacion.id, "Nombre": Incidencia.Instalacion.Nombre },
							"Operador": 		Operador,
							"Estado": 			Incidencia.Estado,
							"Prioridad": 		Incidencia.Prioridad,
							"Guardia": 			Incidencia.Guardia,
							"Comentario": 		Incidencia.Comentario,
							"FechaInicio": 		Incidencia.FechaInicio,
							"FechaPrevista": 		Incidencia.FechaPrevista,
							"FechaFin": 		Incidencia.FechaFin,
							"Comun": 			Incidencia.Comun
						}
						res.json(200, { IncidenciaJSON });

					}
					else { 
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

				}).catch(function(error){ next(error); })

		}
		else if ( req.Rol == '2' ) {

			Incidencia.findOne(req.params.id).then(function(Incidencia) {

				if (Incidencia) {

					res.json({ "id": Incidencia.id, "Estado": Incidencia.Estado, "Comentario": Incidencia.Comentario });

				}
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}


			}).catch(function(error) { next(error); });

		}

		else if ( req.Rol == '3' ) {
			Incidencia.findOne(req.params.id).populateAll().then(function(Incidencia) {

				if (Incidencia) {

					res.json({ 	"id": Incidencia.id, 
							"Tipo": Incidencia.Tipo, 
							"Empleado": Incidencia.Empleado,
							"Titulo": Incidencia.Titulo, 
							"Descripcion": Incidencia.Descripcion, 
							"Instalacion": { "id": Incidencia.Instalacion.id, "Nombre": Incidencia.Instalacion.Nombre }
 					});

				}
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}


			}).catch(function(error) { next(error); });
		}
		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	update: function (req, res) {

		Incidencia.findOne(req.params.id).populateAll().then(function(incidencia) {	

		if ( incidencia ) {	

			if ( req.Rol == '1' ) {

				Incidencia.update(
							{ id: Number(req.params.id) }, 		
							{
								id: 			req.params.id,
								Tipo: 			req.body.Tipo,
								Empleado: 		req.body.Empleado,
								Titulo: 		req.body.Titulo,
								Descripcion: 	req.body.Descripcion,
								Estado: 		req.body.Estado,
								Prioridad: 		req.body.Prioridad,
								Guardia: 		req.body.Guardia,
								Comentario: 	req.body.Comentario,
								FechaInicio: 	req.body.FechaInicio,
								FechaPrevista: 	req.body.FechaPrevista,
								FechaFin: 		req.body.FechaFin,
								Instalacion: 	req.body.Instalacion,
								Operador: 		req.body.Operador,
								Rol: 			req.Rol
							}
				).exec(function (err, updated){

					if (err) {
						res.json(404, { msg: 'Error al actualizar la incidencia.' });
					}

					if (updated) {
						res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
					}

				});

			}

			else if ( req.Rol == '2' ) {
				
				Incidencia.update(
	 						{ id: Number(req.params.id), Operador: Number(req.Usuario.id) }, 		
							{ 	
								Estado: 	req.body.Estado,
								Comentario: 	req.body.Comentario,
								Rol: 		req.Rol
							}
				).exec(function (err, updated) {

					if (err) {
					 	res.json(404, { msg: 'Error al actualizar la incidencia.' });
					}

					if (updated) {
						res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
					}

				});

			}

			else if ( req.Rol == '3' ) {
				Incidencia.update(
	 							{ id: Number(req.params.id), Propietario: Number(req.Usuario.id) }, 		
	 							{
	 								Tipo: 			req.body.Tipo,
	 								Empleado: 		req.body.Empleado,
									Titulo: 		req.body.Titulo,
									Descripcion: 	req.body.Descripcion,
									Instalacion: 	req.body.Instalacion,
									Rol: 			req.Rol
								}
				).exec(function (err, updated) {

					if (err) {
					 	res.json(404, { msg: 'Error al actualizar la incidencia.' });
					}

					if (updated) {
						res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
					}

				});
			}
			else {
					return res.json(403, {err: 'No tiene Permiso.'});
			}

		}

		}).catch(function(error) { next(error); });

		
	},

	updateComun: function(req, res, next) {

		Incidencia.findOne(req.params.IncidenciaId).populateAll().then(function(incidencia) {	

			if ( incidencia ) {	

				if ( req.Rol == '1' ) {
					Incidencia.update(
								{ id: Number(req.params.IncidenciaId) }, 		
								{
									Comun: req.body.Comun
								}
					).exec(function (err, updated){

						if (err) {
							res.json(404, { msg: 'Ha ocurrido un error al actualizar la incidencia.' });
						}

						if (updated) {
							res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
						}

					});

				}

				else {
						return res.json(403, {err: 'Permiso denegado.'});
				}

			}

			}).catch(function(error) { next(error); });

	},

	TiposGuardia: function (req, res) {
		var tiposGuardia = Incidencia.attributes.Guardia.enum;	

		if ( req.Rol == '1' ) {
			res.json(200, { tiposGuardia });	
		}

	},

	tiposIncidencia: function (req, res) {
		var Tipos = Incidencia.attributes.Tipo.enum;	

		if ( req.Rol == '1' || req.Rol == '3' ) {
			res.json(200, { Tipos });	
		}

	},

	estadosIncidencia: function (req, res) {
		var Estados = Incidencia.attributes.Estado.enum;

		if ( req.Rol == '1' || req.Rol == '2' || req.Rol == '3' ) {
			res.json(200, { Estados });
		}
	},

	prioridadesIncidencia: function (req, res) {
		var Prioridades = Incidencia.attributes.Prioridad.enum;

		if ( req.Rol == '1' ) {
			res.json(200, { Prioridades });	
		}
	},

	delete: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Incidencia.destroy({ id:Number(req.params.id) }).exec(function(deleted) {
				if (deleted) {
					return res.negotiate(deleted);
				}
				else{
					res.json(200,{deleted});
				}
			});

		}
	},

	estadistica: function(req, res, next){

		if( req.Rol == '1' ){
		
			req.count;
			Incidencia.count().then(function(count){
				req.count = count;
			}).catch(function(error){ next(error); });

			Incidencia.find().populateAll().then(function(Incidencias){

				if(Incidencias){
					
					var guardia = 0; var noGuardia = 0;
					var tipo1 = 0; var tipo2 = 0;
					var estado1 = 0; var estado2 = 0; var estado3 = 0; var estado4 = 0;
					var comunSi = 0; var comunNo = 0;
					var IncidenciaSinAsignar = 0;
					var IncidenciasJSON = [];

					Incidencias.forEach(function(incidencia){

						var Operador = "Sin Asignar";

						if ( incidencia.Operador != null ) {
							Operador = incidencia.Operador.Nombre + " " + incidencia.Operador.Apellidos;
						}

						var Propietario = incidencia.Empleado;

						IncidenciaJSON = {
							"id": 	incidencia.id,
							"Guardia": 	incidencia.Guardia,
							"Titulo": 	incidencia.Titulo,
							"Descripcion": 	incidencia.Descripcion,
							"Instalacion": 	incidencia.Instalacion.Nombre,
							"Tipo": 	incidencia.Tipo,
							"Creador": Propietario,
							"Operador": Operador,
							"Estado": incidencia.Estado,
							"Prioridad": incidencia.Prioridad,
							"Fecha de Creacion": moment(incidencia.createdAt).locale("es").format('LLL'), 
							"Fecha de Inicio": moment(incidencia.FechaInicio).locale("es").format('LLL'), 
							"Fecha Prevista": moment(incidencia.FechaPrevista).locale("es").format('LLL'), 
							"Fecha de Finalización": moment(incidencia.FechaFin).locale("es").format('LLL')
						};

						IncidenciasJSON.push(IncidenciaJSON);

						if(incidencia.Guardia == 'No' ){
							noGuardia++;
						}
						else {
							guardia++;
						}

						if(incidencia.Tipo == 'Sistemas'){
							tipo1++;
						}
						else{tipo2++;}

						if(incidencia.Estado == 'Sin Iniciar'){
							estado1++;
						}
						else if(incidencia.Estado == 'En Proceso'){
							estado2++;	
						}
						else if(incidencia.Estado == 'Pendiente'){
							estado3++;
						}
						else if(incidencia.Estado == 'Completada'){
							estado4++;
						}

						if(incidencia.Comun == 'Sí'){
							comunSi++;
						}
						else if(incidencia.Comun == 'No'){
							comunNo++;
						}

						if( !incidencia.Operador ){
							IncidenciaSinAsignar++;
						} 
					});
					var informe = {

						Total: 			req.count,
						Guardia: 			guardia,
						NoGuardia: 		noGuardia,
						SinAsignar: 		IncidenciaSinAsignar,
						DeSistemas: 		tipo1,
						DeMantenimiento: 	tipo2,
						Comunes: 			comunSi,
						NoComunes: 		comunNo,
						SinIniciar: 			estado1,
						EnProceso: 		estado2,
						Pendientes: 		estado3,
						Completadas: 		estado4

					}

					res.json(200, { Estadisticas: informe, Incidencias: IncidenciasJSON });
				}

			}).catch(function(error){ next(error); });

		}
		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}
	},
	
	totalIncidenciasFiltro: function (req, res, next) {
		Incidencia.find().where({

					createdAt: 	{ '>=': req.body.FechaInicio	},
					createdAt: 	{ '<=': req.body.FechaFin	}

				}).then(function(Incidencias){

				req.IncidenciaCreadas;

				if(Incidencias){

					req.IncidenciasCreadas = Incidencias.length;
					next();
				}
					

			}).catch(function(error){ next(error); });
				
	},

	estadisticaByOperador: function(req, res, next) {

		if( req.Rol == '1' && req.body.Operador != null ){

			Incidencia.find().populateAll().where({

					createdAt: 	{ '>=': req.body.FechaInicio	},
					createdAt: 	{ '<=': req.body.FechaFin	},
					Operador: 		  req.body.Operador

				}).then(function(Incidencias){
					var IncidenciasJSON = [];

					var total = 0;
					var sistemas = 0; var mantenimiento = 0;
					var estado1 = 0; var estado2 = 0; var estado3 = 0; var estado4 = 0;

					Incidencias.forEach(function(incidencia){

						var Operador = "Sin Asignar";

						if ( incidencia.Operador != null ) {
							Operador = incidencia.Operador.Nombre + " " + incidencia.Operador.Apellidos;
						}

						var Propietario = incidencia.Empleado;

						IncidenciaJSON = {
							"id": 	incidencia.id,
							"Guardia": 	incidencia.Guardia,
							"Titulo": 	incidencia.Titulo,
							"Descripcion": 	incidencia.Descripcion,
							"Instalacion": 	incidencia.Instalacion.Nombre,
							"Tipo": 	incidencia.Tipo,
							"Creador": Propietario,
							"Operador": Operador,
							"Estado": incidencia.Estado,
							"Prioridad": incidencia.Prioridad,
							"Fecha de Creacion": moment(incidencia.createdAt).locale("es").format('LLL'), 
							"Fecha de Inicio": moment(incidencia.FechaInicio).locale("es").format('LLL'), 
							"Fecha Prevista": moment(incidencia.FechaPrevista).locale("es").format('LLL'), 
							"Fecha de Finalización": moment(incidencia.FechaFin).locale("es").format('LLL')
						};

						IncidenciasJSON.push(IncidenciaJSON);

						if(incidencia.Estado == 'Sin Iniciar'){
							estado1++;
						}
						else if(incidencia.Estado == 'En Proceso'){
							estado2++;	
						}
						else if(incidencia.Estado == 'Pendiente'){
							estado3++;
						}
						else if(incidencia.Estado == 'Completada'){
							estado4++;
						}


					});

					var estadisticaByOperador = {

						TotalAsignadas: 		Incidencias.length,
						SinIniciar: 			estado1,
						EnProceso: 		estado2,
						Pendiente: 			estado3,
						Completadas: 		estado4

					}

					res.json(200, { Estadisticas: estadisticaByOperador, Incidencias: IncidenciasJSON });

			}).catch(function(error){ next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});

		}
			
	},

	estadisticaByColaborador: function(req, res, next) {

		if( req.Rol == '1' && req.body.Colaborador != null ){

			Incidencia.find().populateAll().where({

					createdAt: 	{ '>=': req.body.FechaInicio	},
					createdAt: 	{ '<=': req.body.FechaFin	},
					Propietario: 	req.body.Colaborador	

				}).then(function(Incidencias){
					var IncidenciasJSON = [];

					var total = Incidencias.length;

					Incidencias.forEach(function(incidencia){

						var Operador = "Sin Asignar";

						if ( incidencia.Operador != null ) {
							Operador = incidencia.Operador.Nombre + " " + incidencia.Operador.Apellidos;
						}

						var Propietario = incidencia.Empleado;

						IncidenciaJSON = {
							"id": 	incidencia.id,
							"Guardia": 	incidencia.Guardia,
							"Titulo": 	incidencia.Titulo,
							"Descripcion": 	incidencia.Descripcion,
							"Instalacion": 	incidencia.Instalacion.Nombre,
							"Tipo": 	incidencia.Tipo,
							"Creador": Propietario,
							"Operador": Operador,
							"Estado": incidencia.Estado,
							"Prioridad": incidencia.Prioridad,
							"Fecha de Creacion": moment(incidencia.createdAt).locale("es").format('LLL'), 
							"Fecha de Inicio": moment(incidencia.FechaInicio).locale("es").format('LLL'), 
							"Fecha Prevista": moment(incidencia.FechaPrevista).locale("es").format('LLL'), 
							"Fecha de Finalización": moment(incidencia.FechaFin).locale("es").format('LLL')
						};

						IncidenciasJSON.push(IncidenciaJSON);

					});

					var estadisticaByColaborador = {

						TotalTodos: 	req.IncidenciasCreadas,
						TotalColaborador: 	total

					}

					res.json(200, { Estadisticas: estadisticaByColaborador, Incidencias: IncidenciasJSON });

			}).catch(function(error){ next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});

		}
			
	},

	estadisticaByInstalacion: function(req, res, next){

		if( req.Rol == '1' ){
		
			Incidencia.find().populateAll().where({

					createdAt: 	{ '>=': req.body.FechaInicio	},
					createdAt: 	{ '<=': req.body.FechaFin	},
					Instalacion: 	  req.body.Instalacion	

				}).then(function(Incidencias){
					var IncidenciasJSON = [];
					
					var total = 0;
					var sistemas = 0; var mantenimiento = 0;
					var estado1 = 0; var estado2 = 0; var estado3 = 0; var estado4 = 0;
					var IncidenciaSinAsignar = 0;

					Incidencias.forEach(function(incidencia){

						var Operador = "Sin Asignar";

						if ( incidencia.Operador != null ) {
							Operador = incidencia.Operador.Nombre + " " + incidencia.Operador.Apellidos;
						}

						var Propietario = incidencia.Empleado;

						IncidenciaJSON = {
							"id": 	incidencia.id,
							"Guardia": 	incidencia.Guardia,
							"Titulo": 	incidencia.Titulo,
							"Descripcion": 	incidencia.Descripcion,
							"Instalacion": 	incidencia.Instalacion.Nombre,
							"Tipo": 	incidencia.Tipo,
							"Creador": Propietario,
							"Operador": Operador,
							"Estado": incidencia.Estado,
							"Prioridad": incidencia.Prioridad,
							"Fecha de Creacion": moment(incidencia.createdAt).locale("es").format('LLL'), 
							"Fecha de Inicio": moment(incidencia.FechaInicio).locale("es").format('LLL'), 
							"Fecha Prevista": moment(incidencia.FechaPrevista).locale("es").format('LLL'), 
							"Fecha de Finalización": moment(incidencia.FechaFin).locale("es").format('LLL')
						};
						
						IncidenciasJSON.push(IncidenciaJSON);

						if(incidencia.Tipo == 'Sistemas'){
							sistemas++;
						}
						else{mantenimiento++;}

						if(incidencia.Estado == 'Sin Iniciar'){
							estado1++;
						}
						else if(incidencia.Estado == 'En Proceso'){
							estado2++;	
						}
						else if(incidencia.Estado == 'Pendiente'){
							estado3++;
						}
						else if(incidencia.Estado == 'Completada'){
							estado4++;
						}

						if( !incidencia.Operador ){
							IncidenciaSinAsignar++;
						}

					});

					var estadisticaByInstalacion = {

						Total: 			Incidencias.length,
						SinAsignar: 		IncidenciaSinAsignar,
						DeSistemas: 		sistemas,
						DeMantenimiento: 	mantenimiento,
						SinIniciar: 			estado1,
						EnProceso: 			estado2,
						Pendiente: 			estado3,
						Completadas: 		estado4

					}

					res.json(200, { Estadisticas: estadisticaByInstalacion, Incidencias: IncidenciasJSON });

			}).catch(function(error){ next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});

		}

	}	

}