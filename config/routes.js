module.exports.routes = {

	'GET r|^/Incidencia': [
		'IncidenciaController.index'
	],
	'GET r|^/Perfil': [
		'UsuarioController.currentUser'
	]

};