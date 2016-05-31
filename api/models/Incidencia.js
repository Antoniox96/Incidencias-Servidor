module.exports = {

	attributes: {

		Titulo: {
			type: 		'string',
			size: 		150,
			required: 	true	
		},


		Descripcion: {
			type: 		'string',
			size: 		255,
			required: 	true
		},
		
		Tipo: {
			type: 		'string',
			enum: 	['Mantenimiento', 'Sistemas'],
			defaultsTo: 	'Mantenimiento'
		},

		Estado: {
			type: 		'string',
			enum: 	['Sin Iniciar', 'En Proceso', 'Pendiente', 'Completada'],
			defaultsTo: 	'Sin Iniciar'
		},


		Prioridad: {
			type: 		'string',
			enum: 	['Baja', 'Media', 'Alta'],
			defaultsTo: 	'Baja'
		},

		Comun: {
			type: 		'string',
			enum: 	['Sí', 'No'],
			defaultsTo: 	'No'
		},

		FechaInicio: {
			type: 		'date',
			defaulsTo: 	null

		},

		FechaPrevista: {
			type: 		'date',
			defaultsTo: 	null
		},		

		FechaFin: {
			type: 		'date',
			defaultsTo: 	null

		},

		Instalacion: {
			model: 	'Instalacion',
			required: 	true
		},

		Operador: {
			model: 	'Usuario'
		},

		Propietario: {
			model: 	'Usuario'
		}

	},

	beforeCreate: function (values, cb){

		if ( values.Operador ) {
			values.FechaInicio = new Date();
			cb();
		}

		else{ 
			cb(); 
		}

	},

	beforeUpdate: function (values, cb) {

		if ( values.Rol == '1' ) {

			if ( values.Operador != 'Sin Asignar' ) {
				values.FechaInicio = new Date();
				cb();
			}

			else{ 
				cb(); 
			}
			
		}

		else if ( values.Rol == '2' ) {

			if ( values.Estado == 'Completada' ) {
			    	values.FechaFin = new Date();
			    	cb();
		    	}

		    	else{ 
		    		cb(); 
		    	}
		}

		else{
	    		cb();
	    	}
	    
	}

};