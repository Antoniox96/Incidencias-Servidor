module.exports = {

	index: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Incidencia.find().populateAll().then(function(Incidencias){

				if (Incidencias) {
					res.json(Incidencias);
				} 
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}

			}).catch(function(error){ next(error); });

		}

		else if ( req.Rol == '2' ) {

			Incidencia.find().where({ or: [{ "Operador": req.Usuario.id }, { "Comun": "Sí" }] }).populateAll().then(function(Incidencias){

				if (Incidencias) {
					res.json(Incidencias);
				}
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}

			}).catch(function(error){ next(error); });

		}

		else if ( req.Rol == '3' ) {

			Incidencia.find().where({ or: [ { "owner": req.Usuario.id }, { "Comun": "Sí" } ] }).populateAll().then(function(Incidencias){
				
				if (Incidencias){
					res.json(Incidencias);
				}
				else { 
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}

			}).catch(function(error){next(error);});

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
						{ id:req.params.id }, 
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