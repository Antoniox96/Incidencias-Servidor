angular.module("AppIncidencias", ["ngRoute", "ui.bootstrap"])
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
			.otherwise({
            			redirectTo: "/login"
			});
	})
	.run(function($rootScope, $location, $window, AuthenticationService) {
    		$rootScope.$on("$routeChangeSuccess", function(event, nextRoute, currentRoute) {
	    		
	    		$rootScope.displayHeader = AuthenticationService.isLogged;	    	
	    		$rootScope.displayFooter= AuthenticationService.isLogged;	    	

	    		if ( nextRoute.loadedTemplateUrl === "Vistas/LogIn.html" ) {
	    			$rootScope.displayHeader = false;
		    		$rootScope.displayFooter = false;	    	
	    		}

    			if ( nextRoute.access === undefined ) {
    				nextRoute.access = { requiredLogin: true };
    			}

        			if ( nextRoute.access.requiredLogin && !AuthenticationService.isLogged )  {
          			$location.path("/login");
        			}
   		});
	});