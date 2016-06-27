module.exports = {
	
	index: function (req, res) {

		var NickName = req.param('username');
		var Password = req.param('password');

		if ( !NickName && !Password ) {
			return res.json(401, {err: 'No se han introducido datos.'});
		}
		else if (!NickName) {
			return res.json(401, {err: 'No se ha introducido un usuario.'});
		}
		else if ( !Password ) {
			return res.json(401, {err: 'No se ha introducido una contraseña.'})
		}

		Usuario.findOne({NickName: NickName}, function (err, user) {

			if (!user) {
				return res.json(401, {err: 'El usuario introducido no existe.'});
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
				}	
			});

		})

	}

};