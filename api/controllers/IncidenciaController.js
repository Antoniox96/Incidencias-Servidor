module.exports = {

	index: function (req, res, next) {

		var Usuario = sails.config.globals.Usuario;
		var Rol = sails.config.globals.Rol;

		if ( Rol == '1' ) {

			Incidencia.find().populateAll().then(function(Incidencias){

				if (Incidencias) {
					res.json(Incidencias);
				} 
				else { 
					next(new Error('No se ha encontrado ninguna Incidencia'));
				}

			}).catch(function(error){ next(error); });

		}

		else if ( Rol == '2' ) {

			Incidencia.find().where({ or: [{ "Operador": Usuario.id }, { "Comun": "Sí" }] }).populateAll().then(function(Incidencias){

				if (Incidencias) {
					res.json(Incidencias);
				}
				else { 
					next(new Error('No se ha encontrado ninguna Incidencia'));
				}

			}).catch(function(error){ next(error); });

		}

		else if ( Rol == '3' ) {

			Incidencia.find().where({ or: [ { "owner": Usuario.id }, { "Comun": "Sí" } ] }).populateAll().then(function(Incidencias){
				
				if (Incidencias){
					res.json(Incidencias);
				}
				else { 
					next(new Error('No se ha encontrado ninguna Incidencia'));
				}

			}).catch(function(error){next(error);});

		}

	}

};