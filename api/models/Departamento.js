module.exports = {

	attributes: {

		Nombre: {
			type: 		'string',
			size: 		40,
			required: 	true
		},

		Ubicaciones: {
			collection: 	'Ubicacion',
			via: 		'Departamento'
		}	

	}

};