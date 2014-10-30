var module = angular.module('tripsModule');

module.controller('searchTripCtrl', function($scope, $http ,makeRequest) {

	$scope.startPoint = "";

	$scope.getCurrentLocation = function() {
		document.getElementById("search-position-icon").className = "fa fa-spinner fa-spin fa-2x";
		setTimeout(function () { navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true, maximumAge:Infinity, timeout:30000}); }, 0);
	}

	function resetSpinner() {
		document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
	}

	function onSuccess(position) {
		var latitude = "";
		var longitude = "";

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				document.getElementById("start-location-field").value = data.geonames[0].toponymName;
				setTimeout(resetSpinner(), 0);
			}, function(error) {
				setTimeout(resetSpinner(), 0);
				alert('Error, system was unable to fetch gps informations');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			alert('Erro: Permissão negada');
			break;
		case 2:
			alert('Erro: Posição indisponível');
			break;
		case 3:
			alert('Erro: Tempo de ligação expirado');
			break;
		default:
			alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
		setTimeout(resetSpinner, 0);
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

	$scope.getCurrentLocation = function() {
		document.getElementById("search-position-icon").className = "fa fa-spinner fa-spin fa-2x";
		setTimeout(function () { navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true, maximumAge:Infinity, timeout:30000}); }, 0);
	}

	function resetSpinner() {
		document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
	}

	function onSuccess(position) {
		var latitude = "";
		var longitude = "";

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				document.getElementById("start-location-field").value = data.geonames[0].toponymName; 
				setTimeout(resetSpinner(), 0);
			}, function(error) {
				setTimeout(resetSpinner(), 0);
				alert('Error, system was unable to fetch gps informations');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			alert('Erro: Permissão negada');
			break;
		case 2:
			alert('Erro: Posição indisponível');
			break;
		case 3:
			alert('Erro: Tempo de ligação expirado');
			break;
		default:
			alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
		setTimeout(resetSpinner, 0);
	}

	$scope.shareTripSubmit = function() {
		var jsonShareTrip = {
			"startPoint" : $scope.startPoint,
			"destination" : $scope.destination,
			"isFragile" : $scope.isFragile,
			"isFlamable" : $scope.isFlamable,
			//"isLarge" : $scope.isLarge,
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
				alert("Erro: " + "Resposta do servidor não recebida");

			});
	}

});