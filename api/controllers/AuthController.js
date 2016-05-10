module.exports = {
	
	index: function (req, res) {

		var nombreUsuario = req.param('username');
		var password = req.param('password');

		if (!nombreUsuario || !password) {
			return res.json(401, {err: 'Usuario o Contraseña inválida.'});
		}

		Usuario.findOne({nombreUsuario: nombreUsuario}, function (err, user) {

			if (!user) {
				return res.json(401, {err: 'Nombre de Usuario inexistente.'});
			}

			Usuario.comparePassword(password, user, function (err, valid) {
				if (err) {
					return res.json(403, {err: 'Permiso Denegado.'});
				}

				if (!valid) {
					return res.json(401, {err: 'Contraseña incorrecta.'});
				} else {
					res.json({ user: user, token: JWToken.issue({id : user.id }) });
				}	
			});

		})

	}

};