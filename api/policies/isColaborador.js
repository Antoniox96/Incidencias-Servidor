module.exports = function (req, res, next) {

	Rol.findOne( sails.config.globals.rol ).then(function(rol) {
		if ( rol.Nombre === 'Colaborador' ) {
			next();
		}
		else {
			return res.json(403, {err: 'No tienes permisos para acceder a esta sección.'});
		}
	});

}