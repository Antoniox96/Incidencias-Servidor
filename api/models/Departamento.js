module.exports = {

	attributes: {

		Nombre: {
			type: 		'string',
			size: 		40,
			required: 	true
		},

		Instalaciones: {
			collection: 	'Instalacion',
			via: 		'Departamento'
		}	

	}

};