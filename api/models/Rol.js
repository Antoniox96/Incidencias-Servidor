module.exports = {

	attributes: {

		Nombre: {
			type: 		'string',
			size: 		25,
			required: 	true
		},

		Usuarios: {
			collection: 'Usuario',
			via: 'Rol'
		}

	}

};