module.exports = {

	attributes: {

		Nombre: {
			type: 		'string',
			size: 		40,
			required: 	true
		},

		Ubicacion: {
			model:  	'Ubicacion'
		},

		Incidencias: {
			collection: 	'Incidencia',
			via: 		'Instalacion'
		}

	}

};