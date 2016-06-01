module.exports = {
	
	load: function (req, res, next){

		Ubicacion.find().populateAll().then(function(Ubicaciones){

			if (Ubicaciones) {

				req.Ubicaciones;
				UbicacionesJSON = [];

				Ubicaciones.forEach(function(Ubicacion){

					UbicacionJSON = {
						"id":Ubicacion.id,
						"Nombre":Ubicacion.Nombre,
						"Departamento":Ubicacion.Departamento.id,
						"Instalaciones":[]
					};

					Ubicacion.Instalaciones.forEach(function(instalacion){

						UbicacionJSON.Instalaciones.push({ 
													id:instalacion.id,
													Nombre:instalacion.Nombre,
													Ubicacion:instalacion.Ubicacion
												});

					});

					UbicacionesJSON.push(UbicacionJSON);

				});

				req.Ubicaciones = UbicacionesJSON;
				next();

			}

		}).catch(function(error){next(error);});
	
	},

	create: function (req, res, next){

		if ( req.Rol == '1' ) {

			Ubicacion.count().exec(function(err, count){
				Ubicacion.create({
								id: count + 1,
								Nombre: req.body.Nombre,
								Ubicaciones: []
							       }
				).exec(function (err, Ubicacion) {

					if (err) {
						return res.json(err.status, {err: err});
					}

					if (Ubicacion) {
						res.json(200, { msg: 'Ubicación creada satisfactoriamente.' });
					}
				
				});
			});

			
		}

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	update: function (req, res) {

		Ubicacion.findOne(req.params.id).then(function(Ubicacion) {	

		if ( Ubicacion ) {	

			if ( req.Rol == '1' ) {

				Ubicacion.update(
							{ id: Number(req.params.id) }, 		
							{
								Nombre: req.body.Nombre
							}
				).exec(function (err, updated){

					if (err) {
						return err;
					}

					if (updated) {
						res.json(200, { msg: 'La ubicación ha sido actualizada satisfactoriamente.' });
					}

				});

			}

			else {
				return res.json(403, {err: 'Permiso denegado.'});
			}

		}

		}).catch(function(error){ next(error); });

	},

	delete: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Ubicacion.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if (deleted){
					return res.json(200, {err: 'La ubicación ha sido borrada satisfactoriamente.'});
				}
				else{
					return res.json(404, {err: 'Error al borrar la ubicación.'});
				}
			});

		}

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}
	}

};