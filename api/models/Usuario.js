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

		tipoOperador: {
			type: 		'string',
			enum: 	['Mantenimiento','Sistemas']
		},

		Rol: {
			model: 	'Rol',
			required: true
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

		Email: {
			type: 		'string',
			size: 		100,
			required: 	true,
			unique: 	true,
		},

		toJSON: function() {
			var Usuario = this.toObject();
			// Borramos la contraseña por motivos de seguridad ya que no nos interesa que se devuelva.
			delete Usuario.EncryptedPassword;
			return Usuario;
		}

	},

	// Se encripta la contraseña antes de crear un usuario.
	beforeCreate : function (values, next) {

		bcrypt.genSalt(10, function (err, salt) {

			if (err) { return next(err); }

			bcrypt.hash(values.Password, salt, function (err, hash) {

				if(err) return next(err);
				values.Password = hash;
				next();

			});
			
		});

	},

	// Se encripta la contraseña antes de actualizar un usuario.
	beforeUpdate : function (values, next) {

		bcrypt.genSalt(10, function (err, salt) {

			if (err) { return next(err); }

			bcrypt.hash(values.Password, salt, function (err, hash) {

				if(err) return next(err);
				values.Password = hash;
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