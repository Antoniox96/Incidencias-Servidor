module.exports.routes = {

	'GET r|^/Perfil': [
		'UsuarioController.currentUser'
	],

	'GET r|^/TiposIncidencia': [
		'IncidenciaController.tiposIncidencia'
	],

	'GET r|^/EstadosIncidencia': [
		'IncidenciaController.estadosIncidencia'
	],

	'GET r|^/PrioridadesIncidencia': [
		'IncidenciaController.prioridadesIncidencia'
	],

	'GET r|^/Departamento': [
		'UbicacionController.load',
 		'DepartamentoController.find'
	],

	'GET r|^/Operadores': [
		'UsuarioController.findOperadores'
	],

	'POST r|^/ActualizarDatos':[
		'UsuarioController.updateUsuario'
	],

	'GET r|^/Estadistica':[
		'IncidenciaController.estadistica'
	],

	'POST r|^/EstadisticaUsuario':[
		'IncidenciaController.estadisticaByUsuario'
	],

	'POST r|^/EstadisticaInstalacion':[
		'IncidenciaController.estadisticaByInstalacion'
	],

	'POST r|^/Incidencia/(\\d+)/setUnsetComun$|IncidenciaId':[
		'IncidenciaController.updateComun'
	]

};