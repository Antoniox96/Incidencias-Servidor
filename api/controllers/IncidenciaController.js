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

	}

};