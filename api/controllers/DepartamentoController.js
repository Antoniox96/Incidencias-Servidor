module.exports = {
	
	index: function (req, res, next){
	
		Departamento.find().populateAll().then(function(Departamentos){
	
			if (Departamentos) {
				res.json(Departamentos);
			}
			else { 
				res.json(404, {err: 'No se han encontrado Departamentos.'});
			}
	
		}).catch(function(error){next(error);});
	
	}

};