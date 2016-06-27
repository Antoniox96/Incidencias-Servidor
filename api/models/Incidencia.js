module.exports = {

	attributes: {

		Titulo: {
			type: 		'string',
			size: 		150,
			required: 	true	
		},


		Descripcion: {
			type: 		'string',
			size: 		255,
			required: 	true
		},
		
		Tipo: {
			type: 		'string',
			enum: 	['Mantenimiento', 'Sistemas'],
			defaultsTo: 	'Mantenimiento'
		},

		Estado: {
			type: 		'string',
			enum: 	['Sin Iniciar', 'En Proceso', 'Pendiente', 'Completada'],
			defaultsTo: 	'Sin Iniciar'
		},


		Prioridad: {
			type: 		'string',
			enum: 	['Baja', 'Media', 'Alta'],
			defaultsTo: 	'Baja'
		},

		Guardia: {
			type: 		'string',
			enum: 	['No','Sí'],
			defaultsTo: 	'No'
		},

		Comun: {
			type: 		'string',
			enum: 	['Sí', 'No'],
			defaultsTo: 	'No'
		},

		Comentario: {
 			type: 		'string',
 			size: 		255
 		},

		FechaInicio: {
			type: 		'date',
			defaulsTo: 	null

		},

		FechaPrevista: {
			type: 		'date',
			defaultsTo: 	null
		},		

		FechaFin: {
			type: 		'date',
			defaultsTo: 	null

		},

		Instalacion: {
			model: 	'Instalacion',
			required: 	true
		},

		Operador: {
			model: 	'Usuario'
		},

		Propietario: {
			model: 	'Usuario'
		}

	},

	beforeCreate: function (values, cb){
		if ( values.Operador && values.FechaInicio == null || values.FechaInicio == null ) {
			values.FechaInicio = new Date();
			values.FechaPrevista = new Date();
			values.FechaFin = new Date();
			cb();
		}

		else{ 
			cb(); 
		}

	},

	beforeUpdate: function (values, cb) {
		/*if ( values.Rol == '1' ) {

			Incidencia.findOne(Number(values.id)).populateAll().then(function(Incidencia) {

				if (Incidencia){
					if ( !Incidencia.FechaInicio || values.Operador != 0 && Incidencia.Operador != undefined && ( Incidencia.Operador.id != values.Operador) ) {
						values.FechaInicio = new Date();
					}
					else {
						values.FechaInicio = Incidencia.FechaInicio;
					}

				}

				delete values.id;
				delete values.Rol;
				cb();
			});

		}

		else */if ( values.Rol == '2' ) {

			if ( values.Estado == 'Completada' ) {
			    	values.FechaFin = new Date();
		    	}

		    	delete values.Rol;
		    	cb();
		}

		else {
			cb();
		}

	}

};