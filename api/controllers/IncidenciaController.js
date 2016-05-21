module.exports = {

	index: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Incidencia.find().where({ or: [ { "Propietario": req.Usuario.id }, { "Comun": "Sí" } ] }).populateAll()

				.then(function(Incidencias){
					
					var IncidenciasJSON = [];
					var Departamentos = [];
					var FindDepartamento;

					if (Incidencias){

						Incidencias.forEach(function(Incidencia) {

							IncidenciaJSON = { 
								"Titulo": Incidencia.Titulo, 
								"Descripcion": Incidencia.Descripcion, 
								"Departamento": "", 
								"Instalacion": Incidencia.Instalacion.Nombre,
								"Tipo": Incidencia.Tipo, 
								"Operador": Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos,
								"Propietario":Incidencia.Propietario.Nombre + " " + Incidencia.Propietario.Apellidos,
								"Estado": Incidencia.Estado,
								"Prioridad":Incidencia.Prioridad,
								"FechaInicio": Incidencia.FechaInicio,
								"FechaPrevista":Incidencia.FechaPrevista,
								"FechaFin":Incidencia.FechaFin,
								"Comun": Incidencia.Comun
							}

							FindDepartamento = Departamento.findOne(Incidencia.Instalacion.Departamento)

								.then(function(Departamento){

									return Departamentos.push(Departamento.Nombre);

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindDepartamento, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindDepartamento, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindDepartamento, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index]
					})
					return res.json(IncidenciasJSON);
				})

				.catch(function(error){ next(error); });

		}

		else if ( req.Rol == '2' ) {

			Incidencia.find().where({ or: [ { "Operador": req.Usuario.id }, { "Comun": "Sí" } ] }).populateAll()

				.then(function(Incidencias){
					
					var IncidenciasJSON = [];
					var Departamentos = [];
					var FindDepartamento;

					if (Incidencias){

						Incidencias.forEach(function(Incidencia) {

							IncidenciaJSON = { 
								"Titulo": Incidencia.Titulo, 
								"Descripcion": Incidencia.Descripcion, 
								"Departamento": "", 
								"Instalacion": Incidencia.Instalacion.Nombre,
								"Tipo": Incidencia.Tipo, 
								"Propietario":Incidencia.Propietario.Nombre + " " + Incidencia.Propietario.Apellidos,
								"Estado": Incidencia.Estado,
								"Prioridad":Incidencia.Prioridad,
								"FechaPrevista":Incidencia.FechaPrevista,
								"Comun": Incidencia.Comun
							}

							FindDepartamento = Departamento.findOne(Incidencia.Instalacion.Departamento)

								.then(function(Departamento){

									return Departamentos.push(Departamento.Nombre);

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindDepartamento, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindDepartamento, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindDepartamento, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index]
					})
					return res.json(IncidenciasJSON);
				})

				.catch(function(error){ next(error); });

		}

		else if ( req.Rol == '3' ) {

			Incidencia.find().where({ or: [ { "Propietario": req.Usuario.id }, { "Comun": "Sí" } ] }).populateAll()

				.then(function(Incidencias){
					
					var IncidenciasJSON = [];
					var Departamentos = [];
					var FindDepartamento;

					if (Incidencias){

						Incidencias.forEach(function(Incidencia) {

							IncidenciaJSON = { 
								"Titulo": Incidencia.Titulo, 
								"Descripcion": Incidencia.Descripcion, 
								"Departamento": "", 
								"Instalacion": Incidencia.Instalacion.Nombre,
								"Tipo": Incidencia.Tipo, 
								"Operador": Incidencia.Operador.Nombre + " " + Incidencia.Operador.Apellidos,
								"Estado": Incidencia.Estado,
								"FechaInicio": Incidencia.FechaInicio,
								"Comun": Incidencia.Comun
							}

							FindDepartamento = Departamento.findOne(Incidencia.Instalacion.Departamento)

								.then(function(Departamento){

									return Departamentos.push(Departamento.Nombre);

								});

							IncidenciasJSON.push(IncidenciaJSON);
						})

						return [IncidenciasJSON, FindDepartamento, Departamentos];


					}
					else { 
						return null;
						res.json(404, {err: 'No se han encontrado Incidencias.'});
					}

					return [IncidenciasJSON, FindDepartamento, Departamentos];

				})

				.spread(function(IncidenciasJSON, FindDepartamento, Departamentos) {

					IncidenciasJSON.forEach(function(IncidenciaJSON, index) {
						IncidenciaJSON.Departamento = Departamentos[index]
					})
					return res.json(IncidenciasJSON);
				})

				.catch(function(error){ next(error); });
		}

	},

	create: function (req, res) {

		if ( req.Rol == '1' || req.Rol == '3' ) {

			Incidencia.create({
							Titulo: req.body.Titulo,
							Descripcion: req.body.Descripcion,
							Tipo: req.body.Tipo,
							Estado: req.body.Estado,
							Prioridad: req.body.Prioridad,
							Comun: req.body.Comun,
							FechaInicio: req.body.FechaInicio,
							FechaPrevista: req.body.FechaPrevista,
							FechaFin: req.body.FechaFin,
							Instalacion: req.body.Instalacion,
							Operador: req.body.Operador,
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

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	findOne: function (req, res) {

		Incidencia.findOne(Number(req.params.id)).populateAll().then(function(Incidencia){
		
			if (Incidencia) {
				res.json(Incidencia);
			}
		
		}).catch(function(error){ next(error); });

	},

	update: function (req, res) {

		if ( req.Rol == '1' ) {

			Incidencia.update(
						{ id:req.params.incidenciaId }, 
						{
							Titulo: req.body.Titulo,
							Descripcion: req.body.Descripcion,
							Tipo: req.body.Tipo,
							Estado: req.body.Estado,
							Prioridad: req.body.Prioridad,
							Comun: req.body.Comun,
							FechaInicio: req.body.FechaInicio,
							FechaPrevista: req.body.FechaPrevista,
							FechaFin: req.body.FechaFin,
							Instalacion: req.body.Instalacion,
							Operador: req.body.Operador,
						}
			).exec(function (err, updated){

				if (err) {
					return err;
				}

				if (updated) {
					res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
				}

			});

		}

		else if ( req.Rol == '2' ) {
			
			Incidencia.update(
						{ id:req.params.incidenciaId },
						{ 
							Estado:req.body.Estado 
						}
			).exec(function (err, updated){

				if (err) {
				 	return err;
				}

				if (updated) {
					res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
				}

			});
		}

		else if ( req.Rol == '3' ) {
			
			Incidencia.update(
						{ id:req.params.id }, 
						{
							Titulo: req.body.Titulo,
							Descripcion: req.body.Descripcion,
							Tipo: req.body.Tipo,
							Instalacion: req.body.Instalacion,
						}
			).exec(function (err, updated){

				if (err) {
				 	return err;
				}

				if (updated) {
					res.json(200, { msg: 'La Incidencia ha sido actualizada satisfactoriamente.' });
				}

			});
		}
		
	}


}