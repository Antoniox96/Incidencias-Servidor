module.exports.policies = {

	// Toda acción está restringida y requiere una cabecera de autenticación correcta.
	'*': ['isAuthorized'],
	  
	// Se permite crear usuarios sin haber iniciado sesión previamente.
	'UsuarioController': {
		'create': 	true
	},

	// Se permite iniciar sesión sin haber iniciado sesión previamente.
	'AuthController': {
		'*': 		true 
	},

	'UsuarioController':  	{
		'create': 			['isAuthorized', 'isSupervisor'],
		'updatePassword': 	['isAuthorized', 'isSupervisor']
	},

	'IncidenciaController': 	{
		'delete': 			['isAuthorized', 'isSupervisor'],
	},

	'DepartamentoController':{
		'find': 			['isAuthorized'],
		'create': 			['isAuthorized', 'isSupervisor'],
		'delete': 			['isAuthorized', 'isSupervisor']
	},

	'UbicacionController': 	{
		'create': 			['isAuthorized', 'isSupervisor'],
		'delete': 			['isAuthorized', 'isSupervisor']
	},

	'InstalacionController': 	{
		'create': 			['isAuthorized', 'isSupervisor'],
		'delete': 			['isAuthorized', 'isSupervisor']
	}
}