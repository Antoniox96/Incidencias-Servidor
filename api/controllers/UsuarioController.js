module.exports = {

	create: function (req, res) {

		Usuario.create(req.body).exec(function (err, user) {
			if (err) {
				console.log(err);
				return res.json(err.status, {err: err});
			}

			// Si el usuario se crea correctamente enviamos el usuario y un token.
			if (user) {
				res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
			}
		});

	},

	currentUser: function(req, res) {

		Usuario.findOne(Number(req.Usuario.id)).then(function(Usuario){
	
			if (Usuario) {

				delete Usuario.Password;
				delete Usuario.createdAt;
				delete Usuario.updatedAt;

				res.json(Usuario);
	
			}
	
		}).catch(function(error){ next(error); });

	},

	updatePassword: function(req, res) {

		Usuario.update(
					{ id: req.body.UsuarioId },
					{ Password: req.body.newPassword }

		).exec(function(err,updated){

			if (err) {
				return err;
			}
			else {
				res.json(200, {msg: 'La contraseña se ha cambiado satisfactoriamente.'});
			}

		});

	},

	updateOwnPassword: function(req, res) {

		Usuario.update(
					{ id: req.Usuario.id },
					{ Password: req.body.newPassword }

		).exec(function(err,updated){

			if (err) {
				return err;
			}
			else {
				res.json(200, {msg: 'La contraseña se ha cambiado satisfactoriamente.'});
			}

		});

	}

}