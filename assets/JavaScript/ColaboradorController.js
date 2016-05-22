angular.module("AppIncidencias")

	.controller('ColaboradorController', function ($scope, $route, $http, $uibModalInstance) {

		$scope.Titulo;
		$scope.Descripcion;

		$scope.getDepartamentos = function() {
			$http.get('/Departamento')
			.success(function(data) {
				$scope.Departamentos = data;
				$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
				$scope.InstalacionSeleccionada = $scope.Departamentos[0].Instalaciones[0];
			})
			.error(function(error) {
				console.log(error);
			})
		}

		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id-1].Instalaciones[0];
		}

		$scope.CrearIncidencia = function () {
			$http.post('/Incidencia', { Titulo: $scope.Titulo, Descripcion: $scope.Descripcion, Instalacion: $scope.InstalacionSeleccionada })
				.success(function(data) {
					console.log(data);
				})
				.error(function(error) {
					console.log(error);
				});
			$route.reload();
			$uibModalInstance.close();
		};

		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});