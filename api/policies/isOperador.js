module.exports = function (req, res, next) {

	Rol.findOne( req.Rol ).then(function(rol) {
		if ( rol.Nombre === 'Operador' ) {
			next();
		}
		else {
			return res.json(403, {err: 'No tienes permisos para acceder a esta sección.'});
		}
	});

}