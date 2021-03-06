﻿angular.module("AppIncidencias", ["ngRoute", "ui.bootstrap", "chart.js", "angularSpinner", "ngSanitize", "ngCsv"])
	.config(function($httpProvider, $routeProvider) {
		$httpProvider.interceptors.push("TokenInterceptor"),
		$routeProvider
			.when("/login", {
			 	controller: "AuthController",
			 	templateUrl: "Vistas/LogIn.html",
		 	          access: { requiredLogin: false }
			})
			.when("/", {
			 	controller: "IncidenciasController",
			 	templateUrl: "Vistas/Incidencias.html",
	 	            	access: { requiredLogin: true }
			})
			.when("/estadisticas", {
			 	controller: "EstadisticasController",
			 	templateUrl: "Vistas/Estadísticas.html",
	 	            	access: { requiredLogin: true }
			})
			.when("/crear", {
			 	controller: "AdminController",
			 	templateUrl: "Vistas/Admin Crear.html",
	 	            	access: { requiredLogin: true }
			})
			.when("/editar", {
			 	controller: "AdminController",
			 	templateUrl: "Vistas/Admin Editar.html",
	 	            	access: { requiredLogin: true }
			})
			.when("/eliminar", {
			 	controller: "AdminController",
			 	templateUrl: "Vistas/Admin Eliminar.html",
	 	            	access: { requiredLogin: true }
			})
			.otherwise({
            			redirectTo: "/"
			});
	})
	.run(function($rootScope, $location, $window, $log, AuthenticationService, UserService) {
    		$rootScope.$on("$routeChangeSuccess", function(event, nextRoute, currentRoute) {
	    		
	    		$rootScope.displayHeader = AuthenticationService.isLogged;	    	

	    		if ( AuthenticationService.isLogged ) {
		    		UserService.userData()
			    		.success(function(data) {
						$rootScope.NickName = data.NickName;
						$rootScope.Nombre = data.Nombre;
						$rootScope.Apellidos = data.Apellidos;
						$rootScope.Email = data.Email;
			    			$rootScope.Rol = data.Rol;
			    			$rootScope.ID = data.id;
			    		})
			    		.error(function(error){
			    			$log.info(500, { err: 'Error al obtener datos del usuario.' });
			    		});
	    		}

	    		if ( nextRoute.loadedTemplateUrl === "Vistas/LogIn.html" ) {
	    			$rootScope.displayHeader = false;
	    		}

    			if ( nextRoute.access === undefined ) {
    				nextRoute.access = { requiredLogin: true };
    			}

        			if ( nextRoute.access.requiredLogin && !AuthenticationService.isLogged )  {
          			$location.path("/login");
        			}
   		});
	});