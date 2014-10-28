var module = angular.module('tripsModule');

module.controller('searchTripCtrl', function($scope, $http, makeRequest) {

	$scope.startPoint = "";
	$scope.geoLocationIcon = "fa-map-marker";

	$scope.getCurrentLocation = function() {
		$scope.geoLocationIcon = "fa-spinner fa-spin";
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

	function onSuccess(position) {

		var latitude = "";
		var longitude = "";

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				$scope.geoLocationIcon = "fa-map-marker";
				$scope.startPoint = data.geonames[0].toponymName;
			}, function(error) {
				$scope.geoLocationIcon = "fa-map-marker";
				alert('Error, system was unable to fetch gps informations');
			});
	}

	function onError(error) {
		switch(error.code) {
		case 1:
			alert('Erro: Permissão negada');
			$scope.geoLocationIcon = "fa-map-marker";
			break;
		case 2:
			alert('Erro: Posição indisponível');
			$scope.geoLocationIcon = "fa-map-marker";
			break;
		case 3:
			alert('Erro: Tempo de ligação expirado');
			$scope.geoLocationIcon = "fa-map-marker";
			break;
		default:
			$scope.geoLocationIcon = "fa-map-marker";
			alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
	}
});

module.controller('shareTripCtrl', function($scope, $http, makeRequest) {

	$scope.startPoint = "";
	$scope.destination = "";
	$scope.isFragile = false;
	$scope.isFlamable = false;
	$scope.isLarge = false;
	$scope.minPrice = "";
	$scope.maxDeviation = "";
	$scope.geoLocationIcon = "fa-map-marker";

	$scope.getCurrentLocation = function() {
		$scope.geoLocationIcon = "fa-spinner fa-spin";
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

	function onSuccess(position) {
		var latitude = "";
		var longitude = "";

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				$scope.startPoint = data.geonames[0].toponymName;
				$scope.geoLocationIcon = "fa-map-marker";
			}, function(error) {
				$scope.geoLocationIcon = "fa-map-marker";
				alert('Error, system was unable to fetch gps informations');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			alert('Erro: Permissão negada');
			$scope.geoLocationIcon = "fa-map-marker";
			break;
		case 2:
			alert('Erro: Posição indisponível');
			$scope.geoLocationIcon = "fa-map-marker";
			break;
		case 3:
			alert('Erro: Tempo de ligação expirado');
			$scope.geoLocationIcon = "fa-map-marker";
			break;
		default:
			$scope.geoLocationIcon = "fa-map-marker";
			alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
	}

	$scope.shareTripSubmit = function() {
		var jsonShareTrip = {
			"startPoint" : $scope.startPoint,
			"destination" : $scope.destination,
			"isFragile" : $scope.isFragile,
			"isFlamable" : $scope.isFlamable,
			"isLarge" : $scope.isLarge,
			"minPrice" : $scope.minPrice,
			"maxDeviation" : $scope.maxDeviation
		};
		var json = JSON.stringify(jsonShareTrip);
		console.log(json);

		//call service
		makeRequest.sendTrip(json).
			// then is called when service comes with an answer
			then(function(data){
				console.log(data);
			}, function(error) {
				console.log(error);
			});
	}

});