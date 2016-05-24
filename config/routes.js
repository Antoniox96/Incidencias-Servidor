module.exports.routes = {

	'GET r|^/Perfil': [
		'UsuarioController.currentUser'
	],

	'GET r|^/TiposIncidencia': [
		'IncidenciaController.tiposIncidencia'
	],

	'GET r|^/EstadosIncidencia': [
		'IncidenciaController.estadosIncidencia'
	]

};