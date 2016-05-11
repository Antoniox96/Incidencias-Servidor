/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res) {

		if (req.body.password !== req.body.confirmPassword) {
			return res.json(401, { err: 'Las contraseñas no coinciden.' });
		}

		Usuario.create(req.body).exec(function (err, user) {
			if (err) {
				return res.json(err.status, {err: err});
			}

			// Si el usuario se crea correctamente enviamos el usuario y un token.
			if (user) {
				res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
			}
		});

	}

};