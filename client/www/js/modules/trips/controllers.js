var module = angular.module('tripsModule');

module.controller('searchTripCtrl', function($scope, $http, $ionicPopup, makeRequest) {

	$scope.getExistingTrips = function() {

		//call service
		makeRequest.getTrips().
			// then is called when service comes with an answer
			then(function(data){
				console.log(data);
				var tripsJson = JSON.stringify(data.data);

				console.log(tripsJson);
				//fill trips array with the trips received from the server

			}, function(error) {
				alert("Erro: " + "Resposta do servidor não recebida");
			});
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

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
				showAlert('O sistema não conseguiu receber as informações do GPS');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			showAlert('Permissão negada');
			break;
		case 2:
			showAlert('Posição indisponível');
			break;
		case 3:
			showAlert('Tempo de ligação expirado');
			break;
		default:
			showAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
		setTimeout(resetSpinner, 0);
	}
});

module.controller('shareTripCtrl', function($scope, $http, $ionicPopup, makeRequest, BACache) {

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
				showAlert('O sistema não conseguiu receber as informações do GPS');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			showAlert('Permissão negada');
			break;
		case 2:
			showAlert('Posição indisponível');
			break;
		case 3:
			showAlert('Tempo de ligação expirado');
			break;
		default:
			showAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
		setTimeout(resetSpinner, 0);
	}

	$scope.shareTripSubmit = function() {

		if(BACache.info().size === 0) {
			showAlert('Não tem sessão iniciada');
			// change state
			$state.go('menu.login');
		} else {

			var username = makeRequest.getUserName();
			var userEncryptedPassword = makeRequest.getUserEncryptedPassword();
			var username_password = "Basic " + btoa(username + ':' + userEncryptedPassword);

			var vehicleCode = -1;
			var vehicleType = document.getElementById("selectVehicle");
			var vehicle = vehicleType.options[vehicleType.selectedIndex].value;

			if(vehicle === "Viatura de passageiros") {
				vehicleCode = 0;
			} else if(vehicle === "Viatura de mercadorias") {
				vehicleCode = 1;
			}

			vehicleCode = vehicleCode.toString(); 
			$scope.isFragile = $scope.isFragile.toString();
			$scope.isFlamable = $scope.isFlamable.toString();
			$scope.isLarge = $scope.isLarge.toString();
			$scope.startPoint = document.getElementById("start-location-field").value;

			var jsonShareTrip = {
				"starting_point" : $scope.startPoint,
				"destination" : $scope.destination,
				"fragile" : $scope.isFragile,
				"flamable" : $scope.isFlamable,
				"big_dimensions" : $scope.isLarge,
				"vehicle" : vehicleCode,
				"min_price" : $scope.minPrice,
				"max_deviation" : $scope.maxDeviation
			};
			var json = JSON.stringify(jsonShareTrip);

			//call service
			makeRequest.sendTrip(json, username_password).
				// then is called when service comes with an answer
				then(function(data){
					console.log(data);
				}, function(error) {
					alert("Erro: " + "Resposta do servidor não recebida");
				});

			}
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

});