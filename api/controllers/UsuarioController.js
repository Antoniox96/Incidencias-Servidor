module.exports = {
	findUsuarios: function(req, res, next) {
		if ( req.Rol =='1' ) {

			Usuario.find().populateAll().then(function(Usuarios) {

				if (Usuarios) {
					var UsuariosJSON = [];
					Usuarios.forEach(function(Usuario) {
						UsuarioJSON = {
							"ID":Usuario.id,
							"NickName": Usuario.NickName,
							"Nombre":Usuario.Nombre,
							"Apellidos":Usuario.Apellidos,
							"Email": Usuario.Email,
							"Rol": Usuario.Rol.id
						};
						if ( Usuario.Rol.id == '2' ) {
							UsuarioJSON.tipoOperador = Usuario.tipoOperador;
						}
						UsuariosJSON.push(UsuarioJSON);
					});

					res.json(200, { Usuarios: UsuariosJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	findSupervisores: function(req, res, next) {
		if ( req.Rol =='1' ) {

			Usuario.find({
				where:{ Rol: 1 }
			}).then(function(Supervisores) {

				if (Supervisores) {
					var SupervisoresJSON = [];
					Supervisores.forEach(function(Supervisor) {
						SupervisorJSON = {
							"ID":Supervisor.id,
							"Nombre":Supervisor.Nombre,
							"Apellidos":Supervisor.Apellidos
						}
						SupervisoresJSON.push(SupervisorJSON);
					});

					res.json(200, { Supervisores: SupervisoresJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	findOperadores: function(req, res, next) { 

		if ( req.Rol =='1' ) {

			Usuario.find({
				where:{ Rol: 2 }
			}).then(function(Operadores) {

				if (Operadores) {
					var OperadoresJSON = [];
					Operadores.forEach(function(Operador) {
						OperadorJSON = {
							"ID":Operador.id,
							"Nombre":Operador.Nombre,
							"Apellidos":Operador.Apellidos
						}
						OperadoresJSON.push(OperadorJSON);
					});

					res.json(200, { Operadores: OperadoresJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	findColaboradores: function(req, res, next) { 

		if ( req.Rol =='1' ) {

			Usuario.find({
				where:{ Rol: 3 }
			}).then(function(Colaboradores) {

				if (Colaboradores) {
					var ColaboradoresJSON = [];
					Colaboradores.forEach(function(Colaborador) {
						ColaboradorJSON = {
							"ID":Colaborador.id,
							"Nombre":Colaborador.Nombre,
							"Apellidos":Colaborador.Apellidos
						}
						ColaboradoresJSON.push(ColaboradorJSON);
					});

					res.json(200, { Colaboradores: ColaboradoresJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	create: function (req, res) {

		if ( req.Rol == '1' ) {

			if ( req.body.Rol == '1' && req.body.tipoOperador == null ) {
				//SUPERVISOR CREA A UN SUPERVISOR
				Usuario.create({

					NickName: 		req.body.NickName,
					Password: 		req.body.Password,
					Rol: 			req.body.Rol,
					Nombre: 		req.body.Nombre,
					Apellidos: 		req.body.Apellidos,
					Email: 		req.body.Email


				}).exec(function (err, user) {
					if (err) {
						console.log(err);
						return res.json(err.status, {err: err});
					}

					// Si el usuario se crea correctamente enviamos el usuario y un token.
					if (user) {
						res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
					}
				});
			}
			else if ( req.body.Rol == '2' && req.body.tipoOperador != null ) {
				//SUPERVISOR CREA A UN OPERADOR
				Usuario.create({

					NickName: 		req.body.NickName,
					Password: 		req.body.Password,
					Rol: 			req.body.Rol,
					tipoOperador: 	req.body.tipoOperador,
					Nombre: 		req.body.Nombre,
					Apellidos: 		req.body.Apellidos,
					Email: 		req.body.Email


				}).exec(function (err, user) {
					if (err) {
						console.log(err);
						return res.json(err.status, {err: err});
					}

					// Si el usuario se crea correctamente enviamos el usuario y un token.
					if (user) {
						res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
					}
				});
			}
			else if ( req.body.Rol == '3' && req.body.tipoOperador == null ) {
				//SUPERVISOR CREA A UN COLABORADOR
				Usuario.create({

					NickName: 		req.body.NickName,
					Password: 		req.body.Password,
					Rol: 			req.body.Rol,
					Nombre: 		req.body.Nombre,
					Apellidos: 		req.body.Apellidos,
					Email: 		req.body.Email


				}).exec(function (err, user) {
					if (err) {
						console.log(err);
						return res.json(err.status, {err: err});
					}

					// Si el usuario se crea correctamente enviamos el usuario y un token.
					if (user) {
						res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
					}
				});

			}
			else {

				return res.json(403, {err: 'Error al crear un Usuairo. Esto es posible por haber introducido un atributo invalido.'});
		
			}

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}	

	},

	currentUser: function(req, res) {

		Usuario.findOne(Number(req.Usuario.id)).then(function(Usuario) {
	
			if (Usuario) {

				delete Usuario.Password;
				delete Usuario.createdAt;
				delete Usuario.updatedAt;

				res.json(Usuario);
	
			}
	
		}).catch(function(error) { next(error); });

	},

	update: function (req, res, next) {

		Usuario.findOne(req.params.id).populateAll().then(function(usuario){
			if(usuario){
				if ( req.Rol == '1' ) {
					if ( req.body.Password != null ) {
						Usuario.update(
										{ id: Number(req.params.id) },
										{ 
											Password: 		req.body.Password
										 }

							).exec(function (err, updated) {

								if (err) {
									res.json(404, { msg: 'Error al actualizar Usuairo.' });
								}

								if (updated) {
									res.json(200, { msg: 'La contrseña ha sido actualizada satisfactoriamente.' });	
								}

							});
					}
					else if ( req.body.Password == null ) {

						if ( req.body.tipoOperador == null ) {
							Usuario.update(
										{ id: Number(req.params.id) },
										{ 
											NickName: 		req.body.NickName,
											Nombre: 		req.body.Nombre,
											Apellidos: 		req.body.Apellidos,
											Email: 		req.body.Email
										 }

							).exec(function (err, updated) {

								if (err) {
									res.json(404, { msg: 'Error al actualizar Usuairo.' });
								}

								if (updated) {
									res.json(200, { msg: 'Usuario actualizado satisfactoriamente.' });	
								}

							});

						}
						if ( req.body.tipoOperador != null ) {
							/*Super actualiza el dato de un Operador*/
							Usuario.update(
										{ id: Number(req.params.id) },
										{ 
											NickName: 		req.body.NickName,
											Nombre: 		req.body.Nombre,
											Apellidos: 		req.body.Apellidos,
											tipoOperador: 	req.body.tipoOperador,
											Email: 		req.body.Email

										}
							).exec(function(err, updated) {
								if (err) {
								res.json(404, { msg: 'Error al actualizar el Usuario.' });
								}

								if (updated) {
									res.json(200, { msg: 'Usuario actualizado satisfactoriamente.' });	
								}
							});

						}	
					}
					

				}
				else {

					return res.json(403, {err: 'Permiso denegado.'});
				
				}
			}
		}).catch(function(error) { next(error); });

	},

	delete: function (req, res, next) {
		if ( req.Rol == '1' ){
			Usuario.findOne(req.params.id).then(function(Supervisor){
				if( Supervisor.id != req.Usuario.id ) {
					Usuario.destroy({ id:Number(req.params.id) }).exec(function(deleted) {
						if (deleted) {
							return res.negotiate(deleted);
						}
						else{
							res.json(200,{deleted});
						}
					});
				}
				

			}).catch(function(error) { next(error); });
		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}

	},

	TiposOperador: function (req, res, next) {
		var Tipos = Usuario.attributes.tipoOperador.enum;

		if ( req.Rol == '1' ) {
			res.json(200, { Tipos });	
		}
	}


}