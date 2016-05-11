var bcrypt = require('bcrypt');

module.exports = {
		
	attributes: {

		NickName: {
			type: 		'string',
			size: 		20,
			required: 	true,
			unique: 	true,			
		},


		Password: {
			type: 		'string',
			size: 		255,
			required: 	true,
		},

		Rol: {
			model: 	'Rol'
		},

		Nombre: {
			type: 		'string',
			size: 		40,
			required: 	true
		},

		Apellidos: {
			type: 		'string',
			size: 		80,
			required: 	true,
		},

		EMail: {
			type: 		'string',
			size: 		100,
			required: 	true,
			unique: 	true,
		},

		toJSON: function() {
			var Usuario = this.toObject();
			// Borramos la contraseña por motivos de seguridad ya que no nos interesa que se devuelva.
			delete Usuario.Password;
			return Usuario;
		}

	},

	// Se encripta la contraseña antes de crear un usuario.
	beforeCreate : function (values, next) {

		bcrypt.genSalt(10, function (err, salt) {

			if (err) { return next(err); }

			bcrypt.hash(values.password, salt, function (err, hash) {

				if(err) return next(err);
				values.password = hash;
				next();

			});
		});

	},

	comparePassword : function (password, user, cb) {

		bcrypt.compare(password, user.Password, function (err, match) {
			if (err) { cb(err); }
			if (match) { cb(null, true); }
			else { cb(err); }
		});
		
	}

};