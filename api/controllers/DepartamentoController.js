module.exports = {
	
	find: function (req, res, next){
	
		Departamento.find().populateAll().then(function(Departamentos){
	
			if (Departamentos) {

				var DepartamentosJSON = [];

				Departamentos.forEach(function(Departamento){

					 var Instalaciones = [];

					Departamento.Instalaciones.forEach(function(Instalacion){
						
						delete Instalacion.createdAt;
						delete Instalacion.updatedAt;
						delete Instalacion.Departamento;
						
						Instalaciones.push({ id: Instalacion.id, Nombre: Instalacion.Nombre });

					});

					DepartamentosJSON.push({ id: Departamento.id, Nombre: Departamento.Nombre, Instalaciones: Departamento.Instalaciones });

				});

				res.json(DepartamentosJSON);

			}
			else { 
				res.json(404, {err: 'No se han encontrado Departamentos.'});
			}
	
		}).catch(function(error){next(error);});
	
	}

};