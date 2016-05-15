module.exports = {
	
	index: function (req, res) {

		var NickName = req.param('username');
		var Password = req.param('password');

		if (!NickName || !Password) {
			return res.json(401, {err: 'Usuario o Contraseña inválida.'});
		}

		Usuario.findOne({NickName: NickName}, function (err, user) {

			if (!user) {
				return res.json(401, {err: 'Nombre de Usuario inexistente.'});
			}

			Usuario.comparePassword(Password, user, function (err, valid) {
				if (err) {
					return res.json(403, {err: 'Permiso Denegado.'});
				}

				if (!valid) {
					return res.json(401, {err: 'Contraseña incorrecta.'});
				} 
				else {
					res.json({ user: user, token: JWToken.issue({id : user.id }) });
					sails.config.globals.Rol = user.Rol;
					sails.config.globals.Usuario = user;
				}	
			});

		})

	}

};