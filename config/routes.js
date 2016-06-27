module.exports.routes = {

	'GET r|^/Perfil': [
		'UsuarioController.currentUser'
	],

	'GET r|^/TiposGuardia': [
		'IncidenciaController.TiposGuardia'
	],

	'GET r|^/TiposIncidencia': [
		'IncidenciaController.tiposIncidencia'
	],

	'GET r|^/TiposOperador': [
		'UsuarioController.TiposOperador'
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

	'GET r|^/Usuarios': [
		'UsuarioController.findUsuarios'
	],

	'GET r|^/Supervisores': [
		'UsuarioController.findSupervisores'
	],

	'GET r|^/Operadores': [
		'UsuarioController.findOperadores'
	],

	'GET r|^/Colaboradores': [
		'UsuarioController.findColaboradores'
	],

	'POST r|^/Estadistica':[
		'IncidenciaController.estadistica'
	],

	'POST r|^/EstadisticaOperador':[
		'IncidenciaController.estadisticaByOperador'
	],

	'POST r|^/EstadisticaColaborador':[
		'IncidenciaController.totalIncidenciasFiltro',
		'IncidenciaController.estadisticaByColaborador'
	],

	'POST r|^/EstadisticaInstalacion':[
		'IncidenciaController.estadisticaByInstalacion'
	],

	'POST r|^/Incidencia/(\\d+)/setUnsetComun$|IncidenciaId':[
		'IncidenciaController.updateComun'
	]

};