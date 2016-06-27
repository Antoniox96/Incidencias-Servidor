module.exports = {

	create: function (req, res, next){

		if( req.Rol == '1' ){

			Instalacion.count().exec(function(err, count){	
				Instalacion.create({
								id: 			count + 1,
								Nombre: 		req.body.Nombre,
								Ubicacion: 		req.body.Ubicacion,
								Incidencias: 	[]
							       }
				).exec(function (err, Instalacion) {

					if (err) {
						return res.json(err.status, {err: err});
					}

					if (Instalacion) {
						res.json(200, { msg: 'Instalacion creada satisfactoriamente.' });
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

			Instalacion.update(
						{ 	id: Number(req.params.id) }, 		
						{
							Nombre: 	req.body.Nombre,
							Ubicacion: 	req.body.Ubicacion
						}
			).exec(function (err, updated){

				if (err) {
					res.json(404, { msg: 'Error al actualizar Instalacion.' });
				}

				if (updated) {
					res.json(200, { msg: 'La instalación ha sido actualizada satisfactoriamente.' });
				}

			});

		}

		else {
			return res.json(403, {err: 'Permiso denegado..'});
		}

	},

	delete: function (req, res, next) {

		if( req.Rol == '1' ) {

			Instalacion.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if (deleted){
					return res.json(200, {err: 'La instalación ha sido actualizada satisfactoriamente.'});
				}
				else{
					return res.json(404, {err: 'Error al borrar la instalación.'});
				}
			});

		}
		else {
			return res.json(403, {err: 'Permiso denegado.'});
		}
	}	

};