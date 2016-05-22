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

		Comun: {
			type: 		'string',
			enum: 	['Sí', 'No'],
			defaultsTo: 	'No'
		},

		FechaInicio: {
			type: 		'date'

		},

		FechaPrevista: {
			type: 		'date'

		},		

		FechaFin: {
			type: 		'date'

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

	}

};