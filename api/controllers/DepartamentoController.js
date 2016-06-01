module.exports = {
	
	find: function (req, res, next){

		Departamento.find().then(function(Departamentos){

			if (Departamentos) {

				var Ubicaciones = req.Ubicaciones;
				DepartamentosJSON = [];

				Departamentos.forEach(function(Departamento){

					DepartamentoJSON = {
							"id": Departamento.id,
							"Nombre": Departamento.Nombre,
							"Ubicaciones": []
						};

					Ubicaciones.forEach(function(Ubicacion){

						if ( Departamento.id == Ubicacion.Departamento ) {
							DepartamentoJSON.Ubicaciones.push({ 
														id: Ubicacion.id, 
														Nombre: Ubicacion.Nombre, 
														Departamento: Ubicacion.Departamento, 
														Instalaciones: Ubicacion.Instalaciones 
													});
						}

					});

					DepartamentosJSON.push(DepartamentoJSON);
				});

				res.json(200, { DepartamentosJSON });
			}

			else {
				res.json(404, { err: 'No se han encontrado departamentos.' });
			}

		}).catch(function(error){next(error);});
	
	},

	create: function (req, res, next){

		if ( req.Rol == '1' ) {

			Departamento.count().exec(function(err, count){
				Departamento.create({
								id: count + 1,
								Nombre: req.body.Nombre,
								Ubicaciones: []
							       }
				).exec(function (err, Departamento) {

					if (err) {
						return res.json(err.status, {err: err});
					}

					if (Departamento) {
						res.json(200, { msg: 'Departamento creado satisfactoriamente.' });
					}
				
				});
			});

			
		}

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}

	},

	update: function (req, res) {

			if ( req.Rol == '1' ) {

				Departamento.findOne(req.params.id).then(function(Departamento) {	

					if ( Departamento ) {	

						Departamento.update(
									{ id: Number(req.params.id) }, 		
									{
										Nombre: req.body.Nombre
									}
						).exec(function (err, updated){

							if (err) {
								return err;
							}

							if (updated) {
								res.json(200, { msg: 'El departamento ha sido actualizado satisfactoriamente.' });
							}

						});

					}

				}).catch(function(error){ next(error); });	

			}

			else {
				return res.json(403, {err: 'Permiso denegado.'});
			}

	},

	delete: function (req, res, next) {

		if ( req.Rol == '1' ) {

			Departamento.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if (deleted){
					return res.json(200, {err: 'El departamento ha sido borrado satisfactoriamente.'});
				}
				else{
					return res.json(404, {err: 'Error al borrar el departamento.'});
				}
			});

		}

		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}
	}

};