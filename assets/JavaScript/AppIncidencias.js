angular.module("AppIncidencias", ["ngRoute"])
	.config(function($httpProvider, $routeProvider) {
		$httpProvider.interceptors.push('TokenInterceptor'),
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
            			redirectTo: '/login'
			});
	})
	.run(function($rootScope, $location, $window, AuthenticationService) {
    		$rootScope.$on("$routeChangeSuccess", function(event, nextRoute, currentRoute) {
    			if ( nextRoute.access === undefined ) {
    				nextRoute.access = { requiredLogin: true };
    			}

        			if ( nextRoute.access.requiredLogin && !AuthenticationService.isLogged )  {
          			$location.path("/login");
        			}
   		});
	});