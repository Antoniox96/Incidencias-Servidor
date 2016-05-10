var bcrypt = require('bcrypt');

module.exports = {
		
	attributes: {

		nombreUsuario: {
			type: 'string',
			required: 'true',
			unique: true
		},

		nombreReal: {
			type: 'string',
			required: 'true',
		},

		apellidos: {
			type: 'string',
			required: 'true',
		},

		encryptedPassword: {
			type: 'string',
		},

		toJSON: function () {
			var Usuario = this.toObject();
			// Borramos la contraseña por motivos de seguridad ya que no nos interesa que se devuelva.
			delete Usuario.encryptedPassword;
			return Usuario;
		}

	},

	// Se encripta la contraseña antes de crear un usuario.
	beforeCreate : function (values, next) {

		bcrypt.genSalt(10, function (err, salt) {

			if (err) { return next(err); }

			bcrypt.hash(values.password, salt, function (err, hash) {

				if(err) return next(err);
				values.encryptedPassword = hash;
				next();

			});
		});

	},

	comparePassword : function (password, user, cb) {

		bcrypt.compare(password, user.encryptedPassword, function (err, match) {
			if (err) { cb(err); }
			if (match) { cb(null, true); }
			else { cb(err); }
		});
		
	}

};